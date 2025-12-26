export const resumeService = {
    async getResume() : Promise<Blob> {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/resume/download`, {
            method: 'GET',
            headers: {
                'Accept': 'application/pdf'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
        }
        return await response.blob();
    }
}