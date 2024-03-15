import puppeteer from "puppeteer";
import { ExecutionContext } from "./dsl/ICommand";
import { Parse } from './dsl/Parser'
import { Execute } from './dsl/Executor'

interface IKeyPair {
	key: string,
	value: string
}
class KeyPair implements IKeyPair {
	key: string = "";
	value: string = "";
}

import Fastify from 'fastify'
const fastify = Fastify({
	logger: true
})
interface IBody {
	input: KeyPair[];
	dsl: string;
	output: string[]
}
// Declare a route
fastify.post<{
	Body: IBody
}>('/scrapes', async function handler(req, reply) {
	const context = new ExecutionContext();
	const { input, dsl, output } = req.body;

	if (input) {
		for (const keyPair of input) {
			context.database.set(keyPair.key, keyPair.value)
		}
	}

	const browser = await puppeteer.launch({
		headless: false
	});

	try {
		const page = await browser.newPage();

		const commands = Parse(dsl);
		console.log(commands)
		await Execute(page, commands, context);
		await browser.close();
		console.log(JSON.stringify(context))
		const result: KeyPair[] = [];
		if (output) {
			for (const out of output) {
				result.push({
					key: out,
					value: context.database.get(out)
				});
			}
		}
		return result;
	} catch {
		browser.close();
		throw new Error("Invalid DSL")
	}
})

// Run the server!
try {
	await fastify.listen({ port: 3000 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}