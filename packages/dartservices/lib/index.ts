import Axios, { AxiosInstance } from 'axios';
import { CompileDDCResponse, CompileRequest, CompileResponse } from './types';
import { decorateJavascript } from './utils/deocrate-js';

const DEFAULT_BASE_URL = 'https://dart-services.appspot.com/';
const BASE_URLS = ['https://dart-services.appspot.com/'];
const API_PATH = 'api/dartservices/v2';

/**
 * this is an error thrown by dart-services server, which is not a client problem, if you get this message, retry api call.
 */
const COMMON_DDC_ERRORS = [
  "Could not resolve the package 'flutter' in 'package:flutter/material.dart'",
];
/**
 * maximun retry number for handling common serverside errors.
 */
const MAX_RETRY = 5;

export class DartServices {
  readonly axios: AxiosInstance;
  constructor(private baseUrl: string) {
    this.axios = Axios.create({
      baseURL: baseUrl + API_PATH,
    });
  }

  /**
   * cursor that holds retry counts of requests.
   */
  retryCursors: Map<number, number> = new Map<number, number>();
  /**
   * use this for flutter code compile
   * @param source
   */
  async compileDDC(
    source: string,
    cursor?: number
  ): Promise<CompileDDCResponse> {
    try {
      const res = await this.axios.post('/compileDDC', <CompileRequest>{
        source: source,
      });
      return res.data;
    } catch (e) {
      if (
        COMMON_DDC_ERRORS.some((errmsg) => {
          return (e.response.data.error?.message ?? ('' as string)).includes(
            errmsg
          );
        })
      ) {
        // console.warn('dart-services serverside issue detected.')
        if (!cursor) {
          // create cursor
          cursor = Date.now();
          this.retryCursors[cursor] = 1;
        } else {
          // console.log(`retrying with cursor ${cursor}`)
          this.retryCursors[cursor] = this.retryCursors[cursor] + 1;
          if (this.retryCursors[cursor] > MAX_RETRY) {
            // delete the cursor.
            this.retryCursors.delete(cursor);
            console.warn('retried, but failed. closing.');
            return {
              error: e.response.data.error,
              sucess: false,
            };
          }
        }
        console.warn(
          'dart-services failed with serverside issues. retrying.. re entry of',
          this.retryCursors[cursor]
        );
        return await this.compileDDC(source, cursor);
      }
      return {
        error: e.response.data.error,
        sucess: false,
      };
    }
  }

  /**
   * use this for pure dart code compile. code with flutter dependency will refuse to compile.
   * @param source
   */
  async compile(source: string): Promise<CompileResponse> {
    const res = await this.axios.post<CompileResponse>('/compile', <
      CompileRequest
    >{
      source: source,
    });
    return res.data;
  }

  /**
   * compiles and build decorated js
   * @param source
   */
  async compileComplete(source: string): Promise<CompileResponse> {
    const compiled = await this.compileDDC(source);
    if (compiled.error) {
      return {
        error: compiled.error,
        sucess: false,
      };
    } else {
      const complete = decorateJavascript(compiled?.result, {
        modulesBaseUrl: compiled.modulesBaseUrl,
      });
      return {
        result: complete,
        sourceMap: null,
        error: null,
        sucess: true,
      };
    }
  }
}

export const defaultClient = new DartServices(DEFAULT_BASE_URL);

export async function compileComplete(
  source: string
): Promise<CompileResponse> {
  return await defaultClient.compileComplete(source);
}
