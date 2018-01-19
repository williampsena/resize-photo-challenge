import { Get, Controller } from '@nestjs/common';

@Controller()
export class HomeController {
	@Get()
	root(): string {
    return 'Welcome to Resize Photo Challenge!';
  }
}
