export type GeckoCoinHistoryItem = {
    data: { id: string; market_data: { current_price: { usd: string } } };
};