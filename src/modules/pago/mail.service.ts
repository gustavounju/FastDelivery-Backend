import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cliente } from 'src/entities/cliente.entity';

@Injectable()
export class PagoMailService {
  constructor(private readonly mailerService: MailerService) {}

  async enviarConfirmacionPago(cliente: Cliente, monto: number) {
    await this.mailerService.sendMail({
      to: cliente.email,
      subject: 'Confirmación de pago',
      template: 'pago-confirmado', // src/templates/pago-confirmado.hbs
      context: {
        nombre: cliente.nombre,
        monto,
      },
    });
  }
}