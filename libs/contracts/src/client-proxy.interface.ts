import { ClientProxy as NestClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// Add a constraint to ensure that PatternData can be indexed by Pattern

export interface ClientProxy<Pattern extends Record<string, string>>
  extends NestClientProxy {
  send<P extends keyof Pattern>(
    pattern: Pattern[P],
    data: any,
  ): Observable<any>;
}
