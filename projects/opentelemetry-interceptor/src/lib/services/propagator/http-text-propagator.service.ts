import { IPropagator } from './propagator.interface';
import { HttpTextPropagator } from '@opentelemetry/api';
import { Injectable } from '@angular/core';
import {
  OpentelemetryConfig,
  Propagator,
  OpentelemetryInjectConfig,
} from '../../configuration/opentelemetry-config';
import { HttpTraceContextPropagatorService } from './http-trace-context-propagator.service';
import { B3PropagatorService } from './b3-propagator.service';

@Injectable({
  providedIn: 'root',
  useFactory: httpTextPropagatorServiceFactory,
  deps: [
    OpentelemetryInjectConfig,
    HttpTraceContextPropagatorService,
    B3PropagatorService,
  ],
})
export class HttpTextPropagatorService implements IPropagator {
  getPropagator(): HttpTextPropagator {
    //factory
    console.error('error');
    return undefined;
  }
}

export function httpTextPropagatorServiceFactory(
  config: OpentelemetryConfig,
  httpTraceContextPropagatorService: HttpTraceContextPropagatorService,
  b3PropagatorService: B3PropagatorService
) {
  let propagator: IPropagator = null;
  switch (config.commonConfig.propagator) {
    case Propagator.b3:
      propagator = b3PropagatorService;
      break;
    case Propagator.httpTrace:
      propagator = httpTraceContextPropagatorService;
      break;
    default:
      break;
  }
  return propagator;
}