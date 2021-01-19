import { Controller, forwardRef, Inject } from '@nestjs/common';

import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(
    @Inject(forwardRef(() => OrganizationService))
    private readonly organizationService: OrganizationService
  ) {}
}
