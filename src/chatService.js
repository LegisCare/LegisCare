import openai from './openaiClient';

/**
 * Utility function to wait for a specified amount of time
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after the specified time
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff for API calls
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise that resolves with the result or rejects with the final error
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      // If it's the last attempt or not a retryable error, throw
      if (attempt === maxRetries || !isRetryableError(error)) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delayTime = baseDelay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries + 1} after ${delayTime}ms delay`);
      await delay(delayTime);
    }
  }
}

/**
 * Checks if an error is retryable (rate limits, network issues, server errors)
 * @param {Error} error - Error to check
 * @returns {boolean} Whether the error is retryable
 */
function isRetryableError(error) {
  const retryableStatuses = [429, 500, 502, 503, 504];
  const status = error?.status || error?.response?.status;
  return retryableStatuses?.includes(status) || error?.code === 'ECONNRESET';
}

/**
 * Enhanced fallback system with context-aware responses
 * @param {string} userMessage - Original user message for context
 * @param {Array} conversationHistory - Previous messages for better context
 * @returns {Object} Contextual fallback response
 */
function createIntelligentFallbackResponse(userMessage = '', conversationHistory = []) {
  const message = userMessage?.toLowerCase() || '';
  
  // Analyze user message for emotional context and provide appropriate response
  const emotionalKeywords = {
    anxiety: ['ansiedade', 'ansioso', 'preocupado', 'nervoso', 'pânico', 'medo'],
    depression: ['depressão', 'deprimido', 'triste', 'vazio', 'sem esperança', 'desânimo'],
    stress: ['stress', 'stressado', 'pressão', 'sobrecarregado', 'cansado'],
    relationships: ['relacionamento', 'família', 'amigos', 'parceiro', 'namorado', 'casamento'],
    work: ['trabalho', 'emprego', 'chefe', 'carreira', 'profissional', 'desemprego'],
    positive: ['obrigado', 'ajuda', 'melhor', 'bem', 'feliz', 'bom']
  };

  // Determine dominant emotional theme
  let theme = 'general';
  let maxMatches = 0;

  Object.keys(emotionalKeywords)?.forEach(key => {
    const matches = emotionalKeywords?.[key]?.filter(keyword => message?.includes(keyword))?.length;
    if (matches > maxMatches) {
      maxMatches = matches;
      theme = key;
    }
  });

  // Generate contextual responses based on theme and conversation history
  const responses = {
    anxiety: {
      content: `Compreendo que está a sentir ansiedade. É completamente normal e você não está sozinho nisto.

**Estratégias que podem ajudar agora:**
• **Respiração 4-7-8**: Inspire por 4s, segure por 7s, expire por 8s
• **Grounding 5-4-3-2-1**: 5 coisas que vê, 4 que toca, 3 que ouve, 2 que cheira, 1 que saboreia
• **Lembre-se**: A ansiedade é temporária e vai passar

**Técnicas para o dia-a-dia:**
• Crie uma rotina matinal calmante
• Limite o consumo de cafeína
• Pratique mindfulness por 5-10 minutos diários

Como se sente ao pensar nestas estratégias? Alguma parece mais adequada para a sua situação?`,
      suggestions: [
        'Psicólogo especializado em ansiedade',
        'Técnicas de mindfulness',
        'Grupos de apoio para ansiedade'
      ]
    },
    depression: {
      content: `Sinto muito que esteja a passar por este momento difícil. A sua coragem em partilhar já é um primeiro passo importante.

**Pequenos passos que podem fazer diferença:**
• **Rotina básica**: Acordar e dormir a horas regulares
• **Movimento suave**: Uma caminhada de 10 minutos, alongamentos
• **Conexão**: Contactar uma pessoa próxima, mesmo que brevemente
• **Autocuidado**: Tomar banho, comer algo nutritivo

**Lembre-se sempre:**
• Não está sozinho - há pessoas que se preocupam consigo
• Os sentimentos são temporários, mesmo os mais difíceis
• Pedir ajuda é sinal de força, não de fraqueza

Que tipo de apoio sente que mais precisa neste momento?`,
      suggestions: [
        'Psicólogo clínico especializado',
        'Centro de saúde mental',
        'Linha de apoio 24h: 213 544 545'
      ]
    },
    stress: {
      content: `O stress pode ser avassalador, mas há maneiras eficazes de o gerir. Vamos trabalhar juntos para encontrar estratégias que funcionem para si.

**Alívio imediato do stress:**
• **Pausa consciente**: 3 respirações profundas agora mesmo
• **Tensão e relaxamento**: Contraia e relaxe cada grupo muscular
• **Reorganizar prioridades**: Liste tarefas por urgência real

**Gestão a longo prazo:**
• **Limites saudáveis**: Aprender a dizer "não" quando necessário
• **Tempo para si**: 15 minutos diários só seus
• **Exercício regular**: Mesmo uma caminhada ajuda

**Sinais para procurar ajuda profissional:**
• Stress persistente há mais de 2 semanas
• Impacto no sono, apetite ou relacionamentos
• Sentimentos de sobrecarga constante

O que sente que contribui mais para o seu stress atualmente?`,
      suggestions: [
        'Psicólogo organizacional',
        'Técnicas de gestão de tempo',
        'Terapia cognitivo-comportamental'
      ]
    },
    relationships: {
      content: `Os relacionamentos são uma parte fundamental do nosso bem-estar. É natural que surjam desafios e conflitos.

**Princípios para relacionamentos saudáveis:**
• **Comunicação aberta**: Expressar sentimentos sem culpabilizar
• **Escuta ativa**: Tentar compreender antes de ser compreendido
• **Respeito mútuo**: Aceitar diferenças e limites pessoais
• **Tempo de qualidade**: Momentos dedicados um ao outro

**Quando procurar ajuda:**
• Conflitos frequentes sem resolução
• Falta de comunicação efectiva
• Sentimentos de desrespeito ou desvalorização
• Padrões de comportamento prejudiciais

**Estratégias práticas:**
• Use "eu sinto" em vez de "tu sempre/nunca"
• Escolha momentos calmos para conversas importantes
• Pratique a empatia - tente ver a perspectiva do outro

Que aspecto do seu relacionamento gostaria de melhorar primeiro?`,
      suggestions: [
        'Terapeuta de casal/família',
        'Workshops de comunicação',
        'Mediação familiar'
      ]
    },
    work: {
      content: `As questões profissionais podem afetar significativamente o nosso bem-estar. É importante encontrar um equilíbrio saudável.

**Gestão do ambiente de trabalho:**
• **Organização**: Crie um espaço e rotina que funcione para si
• **Comunicação**: Seja claro sobre necessidades e limites
• **Desenvolvimento**: Invista em competências que valoriza
• **Rede de apoio**: Cultive relações positivas com colegas

**Sinais de burnout a observar:**
• Exaustão física e emocional constante
• Perda de motivação ou satisfação no trabalho
• Irritabilidade aumentada
• Problemas de sono ou concentração

**Estratégias de autocuidado:**
• Pausas regulares durante o dia
• Separação clara entre trabalho e vida pessoal
• Actividades que lhe dão prazer fora do trabalho

Sente que o trabalho está a impactar negativamente outras áreas da sua vida?`,
      suggestions: [
        'Coach de carreira',
        'Psicólogo organizacional',
        'Recursos humanos da empresa'
      ]
    },
    positive: {
      content: `Que maravilhoso ouvir algo positivo! É importante celebrar os momentos bons e o progresso, por menor que seja.

**Consolidar o progresso:**
• **Reconhecer conquistas**: Valorize cada passo dado
• **Aprender com o sucesso**: O que funcionou bem?
• **Gratidão**: Três coisas pelas quais se sente grato hoje
• **Partilhar alegria**: Conte a alguém próximo sobre o seu momento positivo

**Manter o bem-estar:**
• Continue as práticas que estão a resultar
• Prepare-se para futuras dificuldades com compaixão
• Use este momento como força para enfrentar desafios

**Construir resiliência:**
• Lembre-se deste sentimento nos dias difíceis
• Crie uma lista de coisas que lhe trazem alegria
• Pratique a autocompaixão regularmente

O que mais contribui para se sentir bem consigo mesmo?`,
      suggestions: [
        'Grupos de desenvolvimento pessoal',
        'Actividades de bem-estar',
        'Práticas de mindfulness'
      ]
    },
    general: {
      content: `Obrigada por partilhar comigo. Criar um espaço seguro para expressar pensamentos e sentimentos é fundamental para o bem-estar.

**Como posso apoiá-lo melhor:**
• **Escuta sem julgamentos**: Partilhe o que sente sem receio
• **Clarificação de pensamentos**: Organizar ideias complexas
• **Recursos adequados**: Sugestões personalizadas de apoio
• **Estratégias práticas**: Ferramentas para o dia-a-dia

**Áreas onde posso ajudar:**
• Gestão de emoções e stress
• Questões de relacionamentos
• Desafios profissionais ou académicos
• Autoconhecimento e desenvolvimento pessoal
• Orientação para recursos profissionais

**Lembre-se sempre:**
• Não há problema pequeno demais para ser partilhado
• Procurar apoio é um acto de coragem
• Cada pessoa tem o seu ritmo de crescimento

O que gostaria de explorar ou partilhar hoje? Estou aqui para ouvir.`,
      suggestions: [
        'Recursos locais de saúde mental',
        'Técnicas de autoconhecimento',
        'Estratégias de bem-estar geral'
      ]
    }
  };

  const response = responses?.[theme] || responses?.general;
  
  return {
    ...response,
    timestamp: new Date(),
    error: false,
    fallback: true,
    intelligent: true,
    theme,
    context: `Resposta baseada na análise contextual (${theme})`
  };
}

/**
 * Quota management and degraded mode handler
 */
let quotaExhausted = false;
let quotaResetTimer = null;
let failureCount = 0;

/**
 * Reset quota status after a period
 */
function resetQuotaStatus() {
  if (quotaResetTimer) {
    clearTimeout(quotaResetTimer);
  }
  
  quotaResetTimer = setTimeout(() => {
    quotaExhausted = false;
    failureCount = 0;
    console.log('Quota status reset - attempting API calls again');
  }, 300000); // 5 minutes
}

/**
 * Generates professional suggestions based on user message context
 * @param {string} userMessage - The user's message to analyze
 * @param {boolean} useLocal - Whether to use local analysis instead of API
 * @returns {Promise<Array>} Array of professional suggestions
 */
async function generateProfessionalSuggestions(userMessage, useLocal = false) {
  try {
    // Keywords that might indicate need for professional help
    const professionalKeywords = [
      'ansiedade', 'depressão', 'stress', 'pânico', 'trauma', 'perda', 'luto',
      'relacionamento', 'família', 'trabalho', 'terapia', 'psicólogo', 'ajuda'
    ];

    const needsProfessionalHelp = professionalKeywords?.some(keyword => 
      userMessage?.toLowerCase()?.includes(keyword)
    );

    if (needsProfessionalHelp) {
      // Use local suggestions if API is having issues
      if (useLocal) {
        return generateLocalSuggestions(userMessage);
      }

      const suggestionResponse = await retryWithBackoff(async () => {
        return await openai?.chat?.completions?.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'Baseado na mensagem do utilizador, sugira até 3 tipos específicos de profissionais de saúde mental em português. Responda apenas com uma lista simples, sem explicações adicionais.'
            },
            {
              role: 'user',
              content: `Mensagem: "${userMessage}"\n\nSugira profissionais adequados:`
            }
          ],
          max_tokens: 100,
          temperature: 0.3
        });
      }, 1, 3000); // Single retry with longer delay for suggestions

      const suggestionsText = suggestionResponse?.choices?.[0]?.message?.content;
      return suggestionsText?.split('\n')?.filter(s => s?.trim())?.slice(0, 3);
    }

    return [];
  } catch (error) {
    console.error('Error generating professional suggestions:', error);
    // Return local suggestions as fallback
    return generateLocalSuggestions(userMessage);
  }
}

/**
 * Enhanced local suggestions with more comprehensive categories
 * @param {string} userMessage - The user's message to analyze
 * @returns {Array} Array of professional suggestions
 */
function generateLocalSuggestions(userMessage) {
  const message = userMessage?.toLowerCase() || '';
  
  // More comprehensive keyword analysis
  if (message?.includes('ansiedade') || message?.includes('pânico') || message?.includes('nervoso')) {
    return [
      'Psicólogo especializado em perturbações de ansiedade',
      'Centro de saúde mental - consulta de psiquiatria',
      'Linha SOS Voz Amiga: 213 544 545'
    ];
  } else if (message?.includes('depressão') || message?.includes('tristeza') || message?.includes('vazio')) {
    return [
      'Psicólogo clínico especialista em depressão',
      'Psiquiatra para avaliação médica',
      'Grupo de apoio à depressão'
    ];
  } else if (message?.includes('relacionamento') || message?.includes('família') || message?.includes('casal')) {
    return [
      'Terapeuta familiar sistémico',
      'Psicólogo especializado em terapia de casal',
      'Centro de mediação familiar'
    ];
  } else if (message?.includes('trabalho') || message?.includes('stress') || message?.includes('burnout')) {
    return [
      'Psicólogo do trabalho e organizacional',
      'Coach certificado em gestão de stress',
      'Consulta de medicina do trabalho'
    ];
  } else if (message?.includes('trauma') || message?.includes('abuso') || message?.includes('violência')) {
    return [
      'Psicólogo especializado em trauma (EMDR)',
      'Centro de apoio à vítima',
      'Linha nacional de emergência social: 144'
    ];
  } else if (message?.includes('vício') || message?.includes('álcool') || message?.includes('droga')) {
    return [
      'Terapeuta especializado em adições',
      'Centro de resposta integrada (CRI)',
      'Alcoólicos Anónimos - reuniões locais'
    ];
  }
  
  return [
    'Centro de saúde - consulta de psicologia',
    'Linha de apoio psicológico: 808 200 204',
    'Ordem dos Psicólogos - encontrar psicólogo'
  ];
}

/**
 * Simplified content moderation with local fallback
 * @param {string} text - Text to moderate
 * @returns {Promise<Object>} Moderation results
 */
export async function moderateUserInput(text) {
  // Skip moderation if quota is exhausted
  if (quotaExhausted) {
    return performLocalModeration(text);
  }

  try {
    const response = await retryWithBackoff(async () => {
      return await openai?.moderations?.create({
        model: 'text-moderation-latest',
        input: text,
      });
    }, 0, 1000); // No retries for moderation to preserve quota

    return response?.results?.[0];
  } catch (error) {
    console.error('Error in content moderation:', error);
    
    // If moderation fails due to quota, use local moderation
    if (error?.status === 429) {
      quotaExhausted = true;
      resetQuotaStatus();
    }
    
    return performLocalModeration(text);
  }
}

/**
 * Local content moderation using keyword filtering
 * @param {string} text - Text to moderate locally
 * @returns {Object} Local moderation results
 */
function performLocalModeration(text) {
  const lowercaseText = text?.toLowerCase() || '';
  
  // Basic harmful content detection
  const harmfulKeywords = [
    'suicídio', 'matar-me', 'acabar com tudo', 'não vale a pena viver',
    'autolesão', 'cortar-me', 'magoar-me',
    'ódio', 'violência', 'matar alguém'
  ];
  
  const containsHarmfulContent = harmfulKeywords?.some(keyword => 
    lowercaseText?.includes(keyword)
  );
  
  return {
    flagged: containsHarmfulContent,
    categories: containsHarmfulContent ? {
      'self-harm': true
    } : {},
    local: true
  };
}

/**
 * Streams an AI response for real-time chat experience
 * @param {string} userMessage - The user's input message
 * @param {Function} onChunk - Callback for each response chunk
 * @param {Array} conversationHistory - Previous messages for context
 */
export async function streamAuraResponse(userMessage, onChunk, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: `Você é a Aura, uma assistente de apoio empático. Responda de forma calorosa e profissional em português, oferecendo suporte emocional e sugestões práticas quando apropriado.`
      }
    ];

    // Add recent conversation history
    const recentHistory = conversationHistory?.slice(-8) || [];
    recentHistory?.forEach(msg => {
      messages?.push({
        role: msg?.isUser ? 'user' : 'assistant',
        content: msg?.content
      });
    });

    messages?.push({
      role: 'user',
      content: userMessage
    });

    const stream = await retryWithBackoff(async () => {
      return await openai?.chat?.completions?.create({
        model: 'gpt-3.5-turbo',
        messages,
        stream: true,
        max_tokens: 400,
        temperature: 0.7
      });
    }, 1, 2000); // Single retry for streaming

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming response:', error);
    
    // Provide appropriate error message based on error type
    let errorMessage = 'Desculpe, ocorreu um erro técnico. Por favor, tente novamente.';
    if (error?.status === 429) {
      errorMessage = 'O serviço está temporariamente sobrecarregado. Aguarde alguns minutos e tente novamente.';
    }
    
    onChunk(errorMessage);
  }
}

/**
 * Health check function to test API connectivity
 * @returns {Promise<boolean>} Whether the API is accessible
 */
export async function checkAPIHealth() {
  try {
    await openai?.chat?.completions?.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 1
    });
    return true;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
}

/**
 * System status information for debugging
 * @returns {Object} Current system status
 */
export function getSystemStatus() {
  return {
    quotaExhausted,
    failureCount,
    degradedMode: quotaExhausted,
    lastReset: quotaResetTimer ? new Date() : null
  };
}
function generateAuraResponse(...args) {
  // eslint-disable-next-line no-console
  console.warn('Placeholder: generateAuraResponse is not implemented yet.', args);
  return null;
}

export { generateAuraResponse };
