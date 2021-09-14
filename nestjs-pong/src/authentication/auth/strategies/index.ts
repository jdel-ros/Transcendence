import { Strategy, Profile } from 'passport-42'
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../services/auth/auth';
import { User } from 'src/authentication/typeorm';

@Injectable()
export class IntraStrategy extends PassportStrategy(Strategy, '42') {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthenticationProvider) {
        super({
            clientID: process.env.API_CLIENT_ID,
			clientSecret: process.env.API_CLIENT_SECRET,
			callbackURL: process.env.API_CALLBACK_URL,
			// scope: ['public']
		});
	}

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
		const  { username } = profile;
		const user = {
			username: username,
			email: profile['emails'][0]['value'],
			login42: profile['username'],
            image_url: profile['photos'][0]['value'],
            displayName: profile['displayName'],
		} 
        console.log(profile);
        console.log('username', user.username);
        console.log('email', user.email);
        console.log('login42', user.login42);
        console.log('image_url', user.image_url);
        console.log('displayName', user.displayName);
		return this.authService.validateUser(user);
    }
}
