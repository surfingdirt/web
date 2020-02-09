const TRACING_HEADER_FIELDS = 'x-b3-custom-tracefields';
const TRACING_HEADER_PARENTSPANID = 'x-b3-parentspanid';
const TRACING_HEADER_SAMPLED = 'x-b3-sampled';
const TRACING_HEADER_TRACEID = 'x-b3-traceid';

function randomTraceId() {
  // === Generate a random 64-bit number in fixed-length hex format
  var digits = '0123456789abcdef';
  var n = '';
  for (var i = 0; i < 16; i++) {
    var rand = Math.floor(Math.random() * 16);
    n += digits[rand];
  }
  return n;
}

export const getTracingHeaders = ({ traceAllRequests, traceFields }) => {
  const headers = {};
  if (traceAllRequests) {
    headers[TRACING_HEADER_SAMPLED] = '1';

    const traceId = randomTraceId();
    headers[TRACING_HEADER_PARENTSPANID] = traceId;
    headers[TRACING_HEADER_TRACEID] = traceId;
  }
  if (traceFields) {
    headers[TRACING_HEADER_FIELDS] = '1';
  }

  return headers;
};
