import https from "https";

export function fetch(
  url: string,
  options: https.RequestOptions
): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, options, (res) => {
        let data: any[] = [];
        res.on("data", (chunk) => {
          data.push(chunk);
        });
        res.on("end", () => {
          resolve(JSON.parse(Buffer.concat(data).toString()));
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
