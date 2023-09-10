import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      audience: config.get("AUTH0_AUDIENCE"), // The resource server where the JWT is processed
      issuer: `${config.get("AUTH0_DOMAIN")}`, // The issuing Auth0 server
      algorithms: ["RS256"], // Asymmetric signing algorithm

      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${config.get("AUTH0_DOMAIN")}.well-known/jwks.json`,
      }),
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
