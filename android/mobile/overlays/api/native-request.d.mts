export function nativeRequest(bridge: { request(options: any): Promise<any> }, origin: string,
 request: {url: string; method?: string; headers?: Record<string,string>; timeout?: number; data?: unknown; signal?: {aborted:boolean}}): Promise<{data:any;status:number;headers:Record<string,string>;url:string}>
