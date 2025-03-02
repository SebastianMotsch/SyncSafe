export function calculateRiskScore(device) {
  let score = 0;

  if (device.vulnerability) score += device.vulnerability * 0.4;
  if (device.packets) score += device.packets > 10000 ? 15 : device.packets > 5000 ? 10 : device.packets > 1000 ? 5 : 0;
  if (device.bytes) score += device.bytes > 50000000 ? 15 : device.bytes > 10000000 ? 10 : device.bytes > 1000000 ? 5 : 0;
  if (device.http_POST) score += device.http_POST > 500 ? 10 : device.http_POST > 100 ? 5 : 0;
  if (device.ssl_handshake_duration_avg) score += device.ssl_handshake_duration_avg > 3.0 ? 10 : device.ssl_handshake_duration_avg > 2.0 ? 5 : 0;
  if (device.tcp_analysis_retransmission) score += device.tcp_analysis_retransmission > 100 ? 10 : device.tcp_analysis_retransmission > 50 ? 5 : 0;

  return Math.min(100, score);
}
