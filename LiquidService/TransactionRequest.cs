namespace LiquidService.Controllers
{
    public class TransactionRequest
    {
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string AssetId { get; set; }
        public decimal Amount { get; set; }
    }
}