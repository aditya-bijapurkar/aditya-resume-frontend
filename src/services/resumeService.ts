export const resumeService = {
    async getResume() : Promise<string> {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/resume/download`);
        const data = await response.json();
        return data.data.resume;
    }
}