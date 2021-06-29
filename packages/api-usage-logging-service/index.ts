interface ProxyApiRequestLog {
  /**
   * ip address of request client (could be server / app / web)
   */
  ip: string;
  /**
   * compressed / raw user agent data of the request
   */
  ua: string;

  /**
   * unique id of the request
   */
  id: string;
}

interface ProxyApiUsageLog {
  /**
   * billed duration in ms
   */
  dur: number;

  /**
   * data payload
   */
  load: number;
}

function log() {}
