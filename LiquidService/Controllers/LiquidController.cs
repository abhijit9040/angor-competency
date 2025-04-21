using Microsoft.AspNetCore.Mvc;
using LiquidService.Services;
using System.Threading.Tasks;

namespace LiquidService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LiquidController : ControllerBase
    {
        private readonly ILiquidService _liquidService;

        public LiquidController(ILiquidService liquidService)
        {
            _liquidService = liquidService;
        }

        [HttpGet("address")]
        public async Task<IActionResult> GenerateAddress()
        {
            var address = await _liquidService.GenerateAddressAsync();
            return Ok(new { address });
        }

        [HttpGet("asset/{assetId}")]
        public async Task<IActionResult> GetAssetInfo(string assetId)
        {
            var assetInfo = await _liquidService.GetAssetInfoAsync(assetId);
            return Ok(assetInfo);
        }

        [HttpPost("validate")]
        public async Task<IActionResult> ValidateAddress([FromBody] AddressRequest request)
        {
            var isValid = await _liquidService.ValidateAddressAsync(request.Address);
            return Ok(new { isValid });
        }

        [HttpPost("transaction")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionRequest request)
        {
            var transactionId = await _liquidService.CreateTransactionAsync(
                request.FromAddress,
                request.ToAddress,
                request.AssetId,
                request.Amount
            );
            return Ok(new { transactionId });
        }
    }
}