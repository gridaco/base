import { DesignPlatform, SdkVersion, StorableLayerType, StorableSceneType } from '@bridged.xyz/client-sdk/lib';
import { Injectable } from '@nestjs/common';
import { SceneRegisterRequest, StorableLayer } from "@bridged.xyz/client-sdk/lib"
import { NestedLayerRecord, Scene } from "../app.entity"
import { nanoid } from 'nanoid';

const sdkVer = SdkVersion.v2020_0


// TODO - choose multipart or json.
// if multipart, get the full request including the image in single request.
// if json way, image must be uploaded, or atleast the url must be reserved before posting a register scene request.


// how to handle nested component? -> we should also upload the components linked. how to handle this case.
@Injectable()
export class ScenesService {
    async registerScreen(request: SceneRegisterRequest) {

        // convert storable layer from request to nested layer record.
        const nestedLayers: NestedLayerRecord[] = request.layers.map((l: StorableLayer) => {
            const nestedLayer = convertStorableLayerToNestedLayer(l)
            return nestedLayer
        })


        const id = nanoid()
        const scene = new Scene({
            id: id,
            projectId: request.projectId,
            fileId: request.fileId,
            nodeId: request.nodeId,
            sdkVersion: sdkVer,
            designPlatform: DesignPlatform.figma,
            cachedPreview: request.preview,
            sceneType: request.sceneType,
            route: request.route,
            name: request.name,
            description: request.description,
            tags: request.tags,
            alias: request.alias,
            variant: request.variant,
            layers: nestedLayers,
            width: request.width,
            height: request.height,
        });

        const saved = await scene.save()

        return saved
    }

    async fetchScene(id: string) {
        const scene = await Scene.get({ id: id })
        return scene
    }

    async updateSceneInfo(request: {
        name?: string
        tags?: string[]
        description?: string
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
function convertStorableLayerToNestedLayer(layer: StorableLayer): NestedLayerRecord {
    // TODO

    const nestedChildLayers: NestedLayerRecord[] = layer.layers?.map((childLayre: StorableLayer) => {
        const nestedChildLayer = convertStorableLayerToNestedLayer(childLayre)
        return nestedChildLayer;
    })

    const convertedLayer = <NestedLayerRecord>{
        nodeId: layer.id,
        index: layer.index,
        name: layer.name,
        sdkVersion: sdkVer,
        node: layer.data,
        type: StorableLayerType.vanilla,
        layers: nestedChildLayers,

        // TODO linked component to layer is currently not supported.
        componentId: undefined,
        width: layer.width,
        height: layer.height,
    }

    return convertedLayer
}
