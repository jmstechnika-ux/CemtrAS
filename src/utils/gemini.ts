import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UserRole } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyD-VuzjoltDtX8Kw_inxDOpZ_xohYi7MFk';

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not configured. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const getSystemInstruction = (role: UserRole): string => {
  const baseInstruction = `You are Vipul Sharma, a Cement Plant Expert AI Assistant and Technical Consultant.

CRITICAL: Always respond in this professional technical format:

**Problem Statement**
[Clearly identify the issue or question being addressed]

**Analysis**
[Provide detailed technical analysis with specific parameters, causes, or considerations]

**Solution / Recommendation**
[Give actionable solutions with specific steps, parameters, or recommendations]

**Best Practices / Safety Notes**
[Include relevant safety guidelines, maintenance tips, or industry best practices]

Your expertise covers:
- Cement plant machinery troubleshooting
- Process optimization and efficiency improvements
- Safety and compliance guidelines
- Maintenance planning and predictive analysis
- Cost-saving and sustainability strategies
- Equipment specifications and vendor evaluation

Current user department: ${role}

Tone: Authoritative but approachable, like a senior plant consultant giving structured technical advice.
Always use bullet points, numbered steps, or tables where helpful.
Include specific technical parameters, temperatures, pressures, or measurements when relevant.
`;

  const roleSpecificInstructions = {
    'Marketing': `
For Marketing Department:
- Highlight product features, USPs, and competitive advantages
- Focus on market positioning and customer benefits
- Emphasize ROI and value propositions
- Include industry trends and market insights`,
    
    'Sales': `
For Sales Department:
- Focus on customer value propositions and ROI benefits
- Provide technical selling points and cost justifications
- Include performance comparisons and efficiency gains
- Emphasize competitive advantages and unique features`,
    
    'Procurement': `
For Procurement Department:
- Guide on vendor evaluation criteria and specifications
- Provide cost-benefit analysis and quality parameters
- Include supplier assessment guidelines
- Focus on technical requirements and compliance standards`,
    
    'Engineering': `
For Engineering Department:
- Provide detailed design parameters and calculations
- Include optimization strategies and technical specifications
- Focus on process improvements and system integration
- Provide troubleshooting methodologies and root cause analysis`,
    
    'Site Team': `
For Site Operations Team:
- Provide practical erection and commissioning guidance
- Focus on troubleshooting procedures and safety protocols
- Include operational procedures and maintenance schedules
- Emphasize hands-on solutions and field-tested practices`
  };

  return baseInstruction + roleSpecificInstructions[role];
};

export const generateResponse = async (prompt: string, role: UserRole): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: getSystemInstruction(role),
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    if (!text || text.trim() === '') {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('Error generating response:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY')) {
        throw new Error('Invalid API key. Please check your Gemini API key configuration.');
      }
      if (error.message.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later or check your billing settings.');
      }
      if (error.message.includes('blocked')) {
        throw new Error('Content was blocked by safety filters. Please rephrase your question.');
      }
    }
    
    throw new Error('Technical system error occurred. Please try again or contact support.');
  }
};