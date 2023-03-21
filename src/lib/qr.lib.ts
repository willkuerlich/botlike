import QR from 'qrcode-terminal';

export const displayQRTerminal = (qrData: string): void => {
  // X-TODO: display the qr code additionally via env+arg
  console.log('QR: ', qrData);
  QR.generate(qrData, { small: true });
};
