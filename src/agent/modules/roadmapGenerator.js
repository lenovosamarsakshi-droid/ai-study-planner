import { runAgent } from "../brain";

export async function generateRoadmap(data) {
    return await runAgent({
        mode: "roadmap",
        ...data,
    });
}