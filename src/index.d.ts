import { Graphics } from "pixi.js";

declare global {
  interface ForceTestNode {
    index: number;
    x: any;
    y: any;
    sprite: Graphics;
  }

  interface ForceTestLink<T> extends d3.ForceLink<ForceTestNode, T> {}


  interface WebpackStats {
  errors: any[];
  warnings: string[];
  version: string;
  hash: string;
  time: number;
  builtAt: number;
  publicPath: string;
  outputPath: string;
  assetsByChunkName: AssetsByChunkName;
  assets: Asset[];
  filteredAssets: number;
  entrypoints: Entrypoints;
  namedChunkGroups: Entrypoints;
  chunks: Chunk[];
  modules: Module4[];
  filteredModules: number;
  children: Child[];
}

interface Child {
  errors: any[];
  warnings: any[];
  publicPath: string;
  outputPath: string;
  assetsByChunkName: Children;
  assets: Asset2[];
  filteredAssets: number;
  entrypoints: Entrypoints2;
  namedChunkGroups: Entrypoints2;
  chunks: Chunk[];
  modules: Module5[];
  filteredModules: number;
  children: any[];
  name: string;
}

interface Chunk2 {
  id: string;
  rendered: boolean;
  initial: boolean;
  entry: boolean;
  size: number;
  names: string[];
  files: string[];
  hash: string;
  siblings: any[];
  parents: any[];
  children: any[];
  childrenByOrder: Children;
  modules: Module5[];
  filteredModules: number;
  origins: Origin2[];
}

interface Origin2 {
  module: string;
  moduleIdentifier: string;
  moduleName: string;
  loc: string;
  request: string;
  reasons: any[];
}

interface Module5 {
  id: string;
  identifier: string;
  name: string;
  index: number;
  index2: number;
  size: number;
  cacheable: boolean;
  built: boolean;
  optional: boolean;
  prefetched: boolean;
  chunks: string[];
  issuer?: string;
  issuerId?: string;
  issuerName?: string;
  issuerPath?: IssuerPath3[];
  failed: boolean;
  errors: number;
  warnings: number;
  assets: any[];
  reasons: Reason4[];
  usedExports: boolean;
  providedExports?: any;
  optimizationBailout: string[];
  depth: number;
  source: string;
}

interface Reason4 {
  moduleId?: string;
  moduleIdentifier?: string;
  module?: string;
  moduleName?: string;
  type: string;
  userRequest: string;
  loc?: string;
}

interface IssuerPath3 {
  id: string;
  identifier: string;
  name: string;
}

interface Entrypoints2 {
  undefined?: Undefined;
  'mini-css-extract-plugin'?: Undefined;
}

interface Undefined {
  chunks: string[];
  assets: string[];
  children: Children;
  childAssets: Children;
}

interface Asset2 {
  name: string;
  size: number;
  chunks: string[];
  chunkNames: any[];
}

interface Module4 {
  id: number | string;
  identifier: string;
  name: string;
  index: number;
  index2: number;
  size: number;
  built: boolean;
  optional: boolean;
  prefetched: boolean;
  chunks: string[];
  issuer?: string;
  issuerId?: string;
  issuerName?: string;
  issuerPath?: IssuerPath[];
  failed: boolean;
  errors: number;
  warnings: number;
  assets: string[];
  reasons: Reason3[];
  usedExports: string[] | boolean;
  providedExports?: string[];
  optimizationBailout: string[];
  depth: number;
  cacheable?: boolean;
  source?: string;
  modules?: Module[];
  filteredModules?: number;
}

interface Reason3 {
  moduleId?: number | string;
  moduleIdentifier?: string;
  module?: string;
  moduleName?: string;
  type?: string;
  userRequest?: string;
  loc?: string;
}

interface Chunk {
  id: string;
  rendered: boolean;
  initial: boolean;
  entry: boolean;
  size: number;
  names: string[];
  files: string[];
  hash: string;
  siblings: string[];
  parents: any[];
  children: any[];
  childrenByOrder: Children;
  modules: Module[];
  filteredModules: number;
  origins: Origin[];
  reason?: string;
}

interface Origin {
  module: string;
  moduleIdentifier: string;
  moduleName: string;
  loc: string;
  request?: any;
  reasons: any[];
}

interface Module2 {
  id: number | string | string;
  identifier: string;
  name: string;
  index: number;
  index2: number;
  size: number;
  built: boolean;
  optional: boolean;
  prefetched: boolean;
  chunks: string[];
  issuer?: string;
  issuerId?: string;
  issuerName?: string;
  issuerPath?: IssuerPath[];
  failed: boolean;
  errors: number;
  warnings: number;
  assets: string[][];
  reasons: Reason[];
  usedExports: string[] | boolean;
  providedExports: (string[] | null)[];
  optimizationBailout: (string | string)[];
  depth: number;
  cacheable?: boolean;
  source?: string;
  modules?: Module[];
  filteredModules?: number;
}

interface Module {
  id?: any;
  identifier: string;
  name: string;
  index: number;
  index2: number;
  size: number;
  cacheable: boolean;
  built: boolean;
  optional: boolean;
  prefetched: boolean;
  chunks: any[];
  issuer: string;
  issuerId?: (null | number)[];
  issuerName: string;
  issuerPath: IssuerPath2[];
  failed: boolean;
  errors: number;
  warnings: number;
  assets: any[];
  reasons: Reason2[];
  usedExports: (string[] | string[] | boolean | boolean | string)[];
  providedExports: string[][];
  optimizationBailout: string[][];
  depth: number;
  source: string;
}

interface Reason2 {
  moduleId: (null | number | string)[];
  moduleIdentifier: string;
  module: string;
  moduleName: string;
  type: string;
  userRequest: string;
  loc: string;
}

interface IssuerPath2 {
  id: (null | number)[];
  identifier: string;
  name: string;
}

interface Reason {
  moduleId?: number | string | string;
  moduleIdentifier?: string | string;
  module?: string | string;
  moduleName?: string | string;
  type?: string;
  userRequest?: string;
  loc?: string;
}

interface IssuerPath {
  id: (null | number | string)[];
  identifier: string;
  name: string;
}

interface Entrypoints {
  app: App;
}

interface App {
  chunks: string[];
  assets: string[];
  children: Children;
  childAssets: Children;
  isOverSizeLimit: boolean;
}

interface Children {
}

interface Asset {
  name: string;
  size: number;
  chunks: string[];
  chunkNames: string[];
  emitted: boolean;
  isOverSizeLimit?: boolean;
}

interface AssetsByChunkName {
  app: string[];
  'chunk-vendors': string[];
}
}