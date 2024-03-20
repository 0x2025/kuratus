require('dotenv').config()

import puppeteer from "puppeteer";
import { ExecutionContext } from "./dsl/ExecutionContext";
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
		headless: false,
		args: ['--no-sandbox']
	});

	try {
		const page = await browser.newPage();
		//page.setDefaultTimeout(10000);
		const commands = Parse(dsl);
		await Execute(page, commands, context);
		await browser.close();
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
	} catch (e) {
		browser.close();
		throw e;
	}
})
fastify.get('/ping', async function handler(req, reply) {
	return "Pong";
})
fastify.get('/test-storage', async function handler(req, reply) {
	const context = new ExecutionContext();
	await context.persistent.set('my-test-key',"Hello from html value as text");
	return "OK";
})
// Run the server!
fastify.listen({
	host: "0.0.0.0",
	port: 3000
})
