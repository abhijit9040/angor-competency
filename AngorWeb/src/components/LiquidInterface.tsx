import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Fade,
  Slide,
  Grow,
} from '@mui/material';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject(new Error('Backend server is not running. Please start the server.'));
    }
    return Promise.reject(error);
  }
);

const LiquidInterface: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [assetId, setAssetId] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [addressError, setAddressError] = useState<string>('');
  const [isValidAddress, setIsValidAddress] = useState<boolean>(false);

  const validateLiquidAddress = async (address: string): Promise<boolean> => {
    if (!address) return false;
    try {
      const response = await api.post('/api/liquid/validate', { address: address });
      return response.data.isValid;
    } catch (err) {
      console.error('Error validating address:', err);
      return false;
    }
  };

  const handleAddressChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const addr = e.target.value;
    setToAddress(addr);
    const isValid = await validateLiquidAddress(addr);
    setIsValidAddress(isValid);
    setAddressError(addr && !isValid ? 'Invalid Liquid address format' : '');
  };

  const generateAddress = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/api/liquid/address');
      setAddress(response.data.address);
      setSuccess('Address generated successfully!');
    } catch (err) {
      console.error('Error generating address:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate address');
    } finally {
      setLoading(false);
    }
  };

  const getAssetInfo = async () => {
    if (!assetId) {
      setError('Please enter an asset ID');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await api.get(`/api/liquid/asset/${assetId}`);
      setSuccess(`Asset Info: ${JSON.stringify(response.data, null, 2)}`);
    } catch (err) {
      console.error('Error fetching asset info:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch asset information');
    } finally {
      setLoading(false);
    }
  };

  const isValidLiquidAddress = (address: string): boolean => {
    // Enhanced Liquid address validation
    // Liquid addresses typically start with ex1, CTE, or VJLC
    const liquidAddressRegex = /^(ex1|CTE|VJLC)[1-9A-HJ-NP-Za-km-z]{26,39}$/;
    return liquidAddressRegex.test(address);
  };


  const createTransaction = async () => {
    if (!address || !toAddress || !assetId || !amount) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await api.post('/api/liquid/transaction', {
        fromAddress: address,
        toAddress,
        assetId,
        amount: parseFloat(amount),
      });
      setSuccess(`Transaction created with ID: ${response.data.transactionId}`);
    } catch (err) {
      console.error('Error creating transaction:', err);
      setError(err instanceof Error ? err.message : 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Grow in={true} timeout={800}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Liquid Network Interface
          </Typography>

          <Fade in={error !== ''} timeout={300}>
            <Box sx={{ mb: error ? 2 : 0 }}>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </Fade>

          <Fade in={success !== ''} timeout={300}>
            <Box sx={{ mb: success ? 2 : 0 }}>
              {success && <Alert severity="success">{success}</Alert>}
            </Box>
          </Fade>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="contained"
                onClick={generateAddress}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                fullWidth
                sx={{
                  height: 48,
                  transition: 'all 0.3s ease-in-out',
                  transform: loading ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                Generate New Address
              </Button>
            </Box>

            <Slide direction="right" in={!!address} mountOnEnter unmountOnExit timeout={300}>
              <TextField
                label="Generated Address"
                value={address}
                fullWidth
                disabled
              />
            </Slide>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                label="Asset ID"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                fullWidth
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={getAssetInfo}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{
                  height: 56,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease-in-out',
                  transform: loading ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                Get Info
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Create Transaction
            </Typography>
            
            <TextField
              label="To Address"
              value={toAddress}
              onChange={handleAddressChange}
              fullWidth
              error={toAddress !== '' && !isValidAddress}
              helperText={toAddress !== '' && !isValidAddress ? 'Invalid Liquid address format. Please enter a valid Liquid address starting with ex1, CTE, or VJLC.' : ''}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                fullWidth
              />
              <Button
                variant="contained"
                onClick={createTransaction}
                disabled={loading || !amount || !toAddress || addressError !== ''}
                startIcon={loading ? <CircularProgress size={20} /> : null}
                sx={{
                  height: 56,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease-in-out',
                  transform: loading ? 'scale(0.98)' : 'scale(1)',
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grow>
    </Container>
  );
};

export default LiquidInterface;