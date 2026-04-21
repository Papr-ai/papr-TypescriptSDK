// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Telemetry extends APIResource {
  /**
   * Telemetry proxy endpoint for anonymous OSS adoption tracking.
   *
   *     This endpoint receives telemetry events from OSS installations and forwards them
   *     to Amplitude using Papr's API key (which stays secure on the server).
   *
   *     **Privacy**:
   *     - All user IDs are hashed/anonymized
   *     - No PII is collected
   *     - Data is used only for understanding OSS adoption patterns
   *
   *     **Opt-in**: Users must explicitly enable telemetry in their OSS installation.
   *
   *     **Request Body**:
   *     ```json
   *     {
   *       "events": [
   *         {
   *           "event_name": "memory_created",
   *           "properties": {
   *             "type": "text",
   *             "has_metadata": true
   *           },
   *           "user_id": "hashed_user_id",
   *           "timestamp": 1234567890000
   *         }
   *       ],
   *       "anonymous_id": "session_id"
   *     }
   *     ```
   */
  trackEvent(
    body: TelemetryTrackEventParams,
    options?: RequestOptions,
  ): APIPromise<TelemetryTrackEventResponse> {
    return this._client.post('/v1/telemetry/events', { body, ...options });
  }
}

/**
 * Response from telemetry endpoint
 */
export interface TelemetryTrackEventResponse {
  /**
   * Number of events successfully processed
   */
  events_processed: number;

  /**
   * Number of events received
   */
  events_received: number;

  /**
   * Whether the events were successfully processed
   */
  success: boolean;

  /**
   * Optional message
   */
  message?: string | null;
}

export interface TelemetryTrackEventParams {
  /**
   * List of telemetry events to track
   */
  events: Array<TelemetryTrackEventParams.Event>;

  /**
   * Anonymous session ID
   */
  anonymous_id?: string | null;
}

export namespace TelemetryTrackEventParams {
  /**
   * Single telemetry event
   */
  export interface Event {
    /**
     * Event name (e.g., 'memory_created', 'search_performed')
     */
    event_name: string;

    /**
     * Event properties (will be anonymized)
     */
    properties?: { [key: string]: unknown } | null;

    /**
     * Event timestamp (Unix epoch in milliseconds)
     */
    timestamp?: number | null;

    /**
     * Anonymous user ID (hashed)
     */
    user_id?: string | null;
  }
}

export declare namespace Telemetry {
  export {
    type TelemetryTrackEventResponse as TelemetryTrackEventResponse,
    type TelemetryTrackEventParams as TelemetryTrackEventParams,
  };
}
