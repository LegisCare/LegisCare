// OpenAI Configuration and helper utilities

/**
 * Validates if OpenAI API key is properly configured
 * @returns {boolean} True if API key is available
 */
export function isOpenAIConfigured() {
  const apiKey = import.meta.env?.VITE_OPENAI_API_KEY;
  return apiKey && apiKey !== 'your-openai-api-key-here' && apiKey?.length > 10;
}

/**
 * Gets the current OpenAI configuration status
 * @returns {Object} Configuration status and details
 */
export function getOpenAIConfigStatus() {
  const apiKey = import.meta.env?.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return {
      configured: false,
      error: 'VITE_OPENAI_API_KEY not found in environment variables',
      suggestion: 'Add VITE_OPENAI_API_KEY to your .env file'
    };
  }
  
  if (apiKey === 'your-openai-api-key-here') {
    return {
      configured: false,
      error: 'VITE_OPENAI_API_KEY is set to placeholder value',
      suggestion: 'Replace with your actual OpenAI API key from https://platform.openai.com/api-keys'
    };
  }
  
  if (apiKey?.length < 10) {
    return {
      configured: false,
      error: 'VITE_OPENAI_API_KEY appears to be invalid (too short)',
      suggestion: 'Check that you copied the complete API key'
    };
  }
  
  return {
    configured: true,
    message: 'OpenAI API key is properly configured'
  };
}

/**
 * Model configurations for different use cases
 */
export const OPENAI_MODELS = {
  // Primary models for chat
  CHAT_FAST: 'gpt-5-mini',      // Fast responses, cost-effective
  CHAT_BALANCED: 'gpt-5',       // Best overall performance
  CHAT_STREAMING: 'gpt-5-mini', // Optimized for streaming
  
  // Specialized models
  CLASSIFICATION: 'gpt-5-nano',  // Simple classification tasks
  REASONING: 'gpt-5',           // Complex reasoning tasks
  
  // Legacy fallbacks
  FALLBACK: 'gpt-4o-mini'       // If GPT-5 models are unavailable
};

/**
 * Default parameters for different conversation types
 */
export const CONVERSATION_CONFIGS = {
  EMPATHETIC_SUPPORT: {
    reasoning_effort: 'low',
    verbosity: 'medium',
    max_completion_tokens: 500
  },
  
  QUICK_RESPONSE: {
    reasoning_effort: 'minimal',
    verbosity: 'low',
    max_completion_tokens: 200
  },
  
  DETAILED_ANALYSIS: {
    reasoning_effort: 'medium',
    verbosity: 'high',
    max_completion_tokens: 800
  }
};

/**
 * Professional suggestion categories
 */
export const PROFESSIONAL_CATEGORIES = [
  'Psicólogo clínico certificado',
  'Terapeuta familiar licenciado', 
  'Conselheiro de saúde mental',
  'Assistente social qualificado',
  'Psiquiatra especializado',
  'Terapeuta de casal',
  'Conselheiro de luto',
  'Especialista em ansiedade',
  'Terapeuta comportamental',
  'Coach de bem-estar mental'
];