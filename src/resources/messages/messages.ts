// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SessionsAPI from './sessions';
import { Sessions } from './sessions';

export class Messages extends APIResource {
  sessions: SessionsAPI.Sessions = new SessionsAPI.Sessions(this._client);
}

Messages.Sessions = Sessions;

export declare namespace Messages {
  export { Sessions as Sessions };
}
