import { BatchRecorder, jsonEncoder } from 'zipkin';
import ZipkinJavascriptOpentracing from 'zipkin-javascript-opentracing';
import { HttpLogger } from 'zipkin-transport-http';

const TRACING_HEADER_FIELDS = 'x-b3-custom-tracefields';
const TRACING_HEADER_PARENTSPANID = 'x-b3-parentspanid';
const TRACING_HEADER_SAMPLED = 'x-b3-sampled';
const TRACING_HEADER_TRACEID = 'x-b3-traceid';

export const getRandomTraceId = () => {
  // === Generate a random 64-bit number in fixed-length hex format
  const digits = '0123456789abcdef';
  let n = '';
  for (let i = 0; i < 16; i++) {
    const rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
};

export const getTracingHeaders = ({ traceAllRequests, traceFields }, traceId) => {
  const headers = {};
  if (traceAllRequests) {
    headers[TRACING_HEADER_SAMPLED] = '1';

    headers[TRACING_HEADER_PARENTSPANID] = traceId;
    headers[TRACING_HEADER_TRACEID] = traceId;
  }
  if (traceFields) {
    headers[TRACING_HEADER_FIELDS] = '1';
  }

  return headers;
};

export const buildTracer = ({ endpoint, serviceName }) => {
  const recorder = new BatchRecorder({
    logger: new HttpLogger({
      endpoint,
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  });

  const tracer = new ZipkinJavascriptOpentracing({
    serviceName,
    recorder,
    kind: 'client',
  });
  return tracer;
};
