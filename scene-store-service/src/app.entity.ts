import { StorableSceneType, DesignPlatform, SdkVersion } from "@bridged.xyz/client-sdk/lib"



interface DynamoSceneTable {
    id: string
    cachedPreview: string
    fileId: string
    name: string
    path: string
    route: string
    layersId: string[]
    componentsId: string[]
    type: "screen" | "component"
    width: number
    height: number
}

// 1 - tree

interface Layer {
    id: string
    key: string
    cachedPreview: string
    parentSceneId: string
    thisSceneId?: string
    width: number
    height: number
    index: number
    node: object
}



/**
 * the record interface of scene table. on scene-store service's db
 */
export interface SceneRecord {
    /**
     * the unique id on the database
     */
    id: string

    /**
     * the id of this scene's origin design file
     */
    fileId: string

    /**
     * the id of this scene's origin design file's node of this content
     */
    nodeId: string

    /**
     * the sdk version of this scene used for conversion and uploading
     */
    sdkVersion: SdkVersion

    /**
     * the design platform used for design of this origin design file.
     */
    designPlatform: DesignPlatform

    /**
     * the type of this scene. rather it can be screen, component, or docs.
     */
    sceneType: StorableSceneType

    /**
     * the layer 
     */
    layers: LayerRecord[]
}



/**
 * the embedded record interface of the layer configuration. this does not have sparated table for storing layer data. it always will be embedded on scene.
 */
interface LayerRecord {
    /**
     * unique id of this layer.
     */
    id: string

    /**
     * the sdk version of this layer is converted.
     */
    sdkVersion: SdkVersion

    /**
     * the transport data of this layer. often used with vanilla layer transport's data configuration.
     */
    data: object

    /**
     * the id of this layer, as scene if possible. scene only component can be embedded under layer, the scene is explicitly renamed as component.
     */
    componentId?: string
}