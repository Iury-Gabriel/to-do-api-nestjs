import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloToSpacelaxy(): string {
    return 'Hello Spacelaxy, Im a backend Developer!';
  }
}
