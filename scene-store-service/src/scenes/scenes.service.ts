import {
  DesignPlatform,
  SdkVersion,
  StorableLayerType,
} from '@bridged.xyz/client-sdk';
import { Injectable } from '@nestjs/common';
import { SceneRegisterRequest, StorableLayer } from '@bridged.xyz/client-sdk';
import { NestedLayerRecord, Scene } from '../app.entity';
import { nanoid } from 'nanoid';
import * as dynamoose from 'dynamoose';

const sdkVer = SdkVersion.v2020_0;

// TODO - choose multipart or json.
// if multipart, get the full request including the image in single request.
// if json way, image must be uploaded, or atleast the url must be reserved before posting a register scene request.

// how to handle nested component? -> we should also upload the components linked. how to handle this case.
@Injectable()
export class ScenesService {
  async registerScreen(request: SceneRegisterRequest) {
    // convert storable layer from request to nested layer record.
    const nestedLayers: NestedLayerRecord[] = request.layers.map(
      (l: StorableLayer) => {
        const nestedLayer = convertStorableLayerToNestedLayer(l);
        return nestedLayer;
      },
    );

    console.log('request.nodeId', request.nodeId);
    const id = nanoid();
    const scene = new Scene({
      id: id,
      projectId: request.projectId,
      // fileId: request.fileId,
      nodeId: request.nodeId,
      sdkVersion: sdkVer,
      designPlatform: DesignPlatform.figma,
      // cachedPreview: request.preview,
      sceneType: request.sceneType,
      // route: request.route || dynamoose.UNDEFINED,
      name: request.name,
      // description: request.description || dynamoose.UNDEFINED,
      // tags: request.tags,
      // alias: request.alias || dynamoose.UNDEFINED,
      // variant: request.variant || dynamoose.UNDEFINED,
      layers: nestedLayers,
      width: request.width,
      height: request.height,
    });

    console.log('saving scene', scene);
    const saved = await scene.save();

    return saved;
  }

  async fetchScene(id: string) {
    const scene = await Scene.get({ id: id });
    return scene;
  }

  async updateSceneInfo(request: {
    name?: string;
    tags?: string[];
    description?: string;
  }) {
    // update only provided field

    if (request.name) {
      // update name
    }

    if (request.tags) {
      // update tags
    }

    if (request.description) {
      // update description
    }
  }

  // multipart form request with image data
  async updateScenePreview() {
    // connect to asset service, host the image.
  }
}

/**
 * converts / maps storable layer (wich is also nested type,) to db nested layers type.
 */
function convertStorableLayerToNestedLayer(
  layer: StorableLayer,
): NestedLayerRecord {
  // TODO

  let nestedChildLayers: NestedLayerRecord[];
  if (layer.layers) {
    nestedChildLayers = layer.layers.map((childLayre: StorableLayer) => {
      const nestedChildLayer = convertStorableLayerToNestedLayer(childLayre);
      return nestedChildLayer;
    });
  }

  const convertedLayer = <NestedLayerRecord>{
    nodeId: layer.nodeId,
    index: layer.index,
    name: layer.name,
    sdkVersion: sdkVer,
    data: layer.data,
    type: layer.type,
    layers: nestedChildLayers, // || dynamoose.UNDEFINED,

    // TODO linked component to layer is currently not supported.
    // componentId: dynamoose.UNDEFINED as any,
    width: layer.width,
    height: layer.height,
    x: layer.x,
    y: layer.y,
  };

  return convertedLayer;
}
