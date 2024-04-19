
declare module 'express-session' {
	export interface SessionData {
	  token: string; // Add your 'token' property here
	  [key: string]: any;
	}
  }

  