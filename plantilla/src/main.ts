import { app } from './server/server';
import { envs } from './config/env';

app.listen(envs.PORT, () => {
	console.log(`server on port ${envs.PORT}`);
});
