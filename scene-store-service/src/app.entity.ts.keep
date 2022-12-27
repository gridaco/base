import * as dynamoose from "dynamoose";
import {
  StorableSceneType,
  DesignPlatform,
  versions,
  StorableLayerType,
} from "@base-sdk/base";

/**
 * the record interface of scene table. on scene-store service's db
 */
export interface SceneRecord {
  /**
   * the unique id on the database
   */
  id: string;

  /**
   * the id of project this scene is assosiated with.
   */
  projectId: string;

  /**
   * the id of this scene's origin design file
   */
  fileId: string;

  /**
   * the id of this scene's origin design file's node of this content
   */
  nodeId: string;

  /**
   * the sdk version of this scene used for conversion and uploading
   */
  sdkVersion: versions.SdkVersion;

  /**
   * the design platform used for design of this origin design file.
   */
  designPlatform: DesignPlatform;

  /**
   * preview image as png for this scene.
   */
  cachedPreview: string;

  /**
   * the type of this scene. rather it can be screen, component, or docs.
   */
  sceneType: StorableSceneType;

  /**
   * the route of this scene, used for screen.
   */
  route?: string;

  /**
   * name of this layer described by designer, defaults to the node's name, can be overriden through the console.
   * which means, the name can be different with the design node's name.
   */
  name?: string;

  /**
   * the explicit description of this scene set by editor. for human communication purpose.
   */
  description?: string;

  /**
   * the explicit tags set by editor. for human communication.
   */
  tags?: string[];

  /**
   * alias for containing many variants
   * ```
   * e.g. "main-page" is the alias for screens below
   * - "main-page/(lg)"
   * - "main-page/(md)"
   * - "main-page/(xs)"
   * ```
   */
  alias?: string;

  /**
   * the unique variant under alias.
   *
   * for alias main page and page "main-page/(lg)", the variant is "lg"
   */
  variant?: string;

  /**
   * the layers holded on this scene. can be vanilla, group, or instance.
   */
  layers: NestedLayerRecord[];

  /**
   * the width of the scene. as-is
   */
  width: number;

  /**
   * the height of the scene. as-is
   */
  height: number;

  /**
   * the background of this scene. can be color or asset uri.
   * in most cases, it will be color. #FFFFFF
   */
  background: string;
}

/**
 * the embedded record interface of the layer configuration. this does not have sparated table for storing layer data. it always will be embedded on scene.
 */
export interface NestedLayerRecord {
  /**
   * node id of this layer originated from design file
   */
  nodeId: string;

  /**
   * the index of this layer based on the scene it's attatched to. the layer under parent group layer will still have index relative to root scene.
   */
  index: number;

  /**
   * un-managed name of this layer. usually if the layer is unmanaged, it will give us name such like "Group 2" and "Rectangle 13".
   * Other wise the layer is a instance, it might contain readable name defined by designer.
   */
  name: string;

  /**
   * the sdk version of this layer is converted.
   */
  sdkVersion: versions.SdkVersion;

  /**
   * the transport node data of this layer. often used with vanilla layer transport's data configuration.
   */
  data: any;

  /**
   * the type of the layer. it can be instance, group, or vanilla.
   * wichh, vanilla can be text, shape, image, or other various types.
   * Since it's rapidly changing, we don't manage the vanilla layer in the managed way.
   * simply storing the raw-configuration of the layer by the sdk-version.
   */
  type: StorableLayerType;

  /**
   * in the case this layer's type is group or instance, it holds extra layers data underneath it.
   *
   * e.g. the type of this layer is component or group, it always holds extra layer data.
   */
  layers?: NestedLayerRecord[];

  /**
   * the id of this layer, as scene if possible. scene only component can be embedded under layer, the scene is explicitly renamed as component.
   */
  componentId?: string;

  /**
   * the width of the layer. as-is
   */
  width: number;

  /**
   * the height of the layer. as-is
   */
  height: number;
}

const TABLE = process.env.DYNAMODB_TABLE;

export const NestedLayer = new dynamoose.Schema(
  {
    nodeId: String,
    key: String,
    index: Number,
    name: String,
    sdkVersion: String,
    node: Object,
    type: {
      type: String,
      enum: [
        "INSTANCE",
        "GROUP",
        "VANILLA",
        "TEXT",
        "LINE",
        "VECTOR",
        "IMAGE",
        "RECT",
      ],
    },
    layers: {
      type: {
        value: Array,
        settings: {
          model: dynamoose.THIS as any,
        },
      },
    },
    componentId: String,
    width: Number,
    height: Number,
  },
  {
    saveUnknown: true,
  }
);

export const SceneSchema = new dynamoose.Schema(
  {
    id: String,
    projectId: String,
    fileId: String,
    nodeId: String,
    sdkVersion: String,
    //DesignPlatformType
    designPlatform: {
      type: String,
      enum: [
        "com.figma.Desktop",
        "com.bohemiancoding.sketch3",
        "xyz.bridged.bridged",
      ],
    },
    cachedPreview: String,
    // SceneType
    sceneType: {
      type: String,
      enum: ["SCREEN", "COMPONENT", "DOCS"],
    },
    route: String,
    name: String,
    description: String,
    tags: {
      type: Set,
      schema: [String],
    },
    alias: String,
    variant: String,
    layers: {
      type: Array,
      schema: [NestedLayer as any],
    },
    width: Number,
    height: Number,
    background: String,
  },
  {
    // https://github.com/dynamoose/dynamoose/pull/1050
    saveUnknown: true,
  }
);

export const Scene = dynamoose.model(TABLE, SceneSchema, {
  create: false,
});
