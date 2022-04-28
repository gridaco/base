interface Asset {}

interface PageManifest {
  id: string;
  title: string;
  document: string;
  assets: { [key: string]: Asset };
}
