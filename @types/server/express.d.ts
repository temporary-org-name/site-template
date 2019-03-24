interface IRequestBundles {
   styles: string;
   scripts: string;
}

declare namespace Express {
   export interface Request {
      bundles: IRequestBundles;
   }
}

declare global {
   namespace Express {
      export interface Request {
         bundles: IRequestBundles;
      }
   }
}