export default class DataFetcher {
    static async fetch<T>(url: string, options?: RequestInit): Promise<T> {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}: ${response.statusText}`)
        }
        return response.json()
    }
}
