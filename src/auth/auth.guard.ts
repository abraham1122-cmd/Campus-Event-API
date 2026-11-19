

import {
    Injectable, CanActivate, ExecutionContext, UnauthorizedException
} from '@nestjs/common'



@Injectable()
export class roleGaurds implements CanActivate{

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest()
        
        const user = request.user;


        if(!user || !user.email || !user.id || !user.role){
            throw new UnauthorizedException("Not authorized");
        }

        request.user ["user"] = {
            id: 1,
            email: "abraham@gmail.com",
            role: "Admin"
        }

        console.log("Auth Gard Excuted");


        return true;
    }
    
    
}