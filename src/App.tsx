import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import jsPDF from 'jspdf';
// import SS_GEMINI_API_KEY from .env;

interface ProcessedNotes {
  executiveSummary: string;
  actionItems: string[];
  technicalTasks: string[];
}

function App() {
  const [rawNotes, setRawNotes] = useState('');
  const [processedNotes, setProcessedNotes] = useState<ProcessedNotes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!rawNotes.trim()) {
      setError('Please enter some notes to process');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `Act as a Senior Product Manager at a Tier-1 tech company. 
Process meeting transcripts into high-density, structured JSON.

### SCHEMA:
{
  "executiveSummary": "High-level objective and critical decisions (max 60 words).",
  "actionItems": ["Immediate business/operational next steps."],
  "technicalTasks": ["Architectural, engineering, or deployment tasks."]
}

### CONSTRAINTS:
1. Tone: Professional, concise, imperative.
2. Deduplication: Merge overlapping points into single high-impact items.
3. Priority: Rank lists by project impact.
4. Output: Return ONLY raw JSON. No markdown backticks or preamble.
5. Null-State: Use "" or [] for empty fields.

### EXAMPLE:
Input: "We need to fix the lag by adding Redis and Mike will tell the client."
Output: {
  "executiveSummary": "Performance optimization via caching layer prioritized to meet client requirements.",
  "actionItems": ["Communicate performance roadmap to client."],
  "technicalTasks": ["Implement Redis caching to reduce query latency."]
}`;

      const prompt = `${systemPrompt}\n\nRaw Notes:\n${rawNotes}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      const responseText = response.text || '';
      
      if (!responseText) {
        throw new Error('No response text received from API');
      }
      
      // Parse JSON from response (remove markdown code blocks if present)
      let jsonText = responseText.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (jsonText.startsWith('```')) {
        jsonText = jsonText.replace(/```\n?/g, '');
      }
      
      let processedData;
      try {
        processedData = JSON.parse(jsonText);
      } catch (parseError) {
        console.error('Failed to parse JSON:', jsonText);
        throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : 'Unknown error'}`);
      }
      
      // Validate and set the processed notes
      if (processedData.executiveSummary !== undefined && Array.isArray(processedData.actionItems) && Array.isArray(processedData.technicalTasks)) {
        setProcessedNotes({
          executiveSummary: processedData.executiveSummary || '',
          actionItems: processedData.actionItems || [],
          technicalTasks: processedData.technicalTasks || [],
        });
      } else {
        console.error('Invalid response structure:', processedData);
        throw new Error(`Invalid response format from API. Expected: {executiveSummary: string, actionItems: string[], technicalTasks: string[]}. Got: ${JSON.stringify(processedData)}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process notes. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!processedNotes) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Helper function to add a new page if needed
    const checkPageBreak = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to split text into lines
    const splitText = (text: string, maxWidth: number): string[] => {
      return doc.splitTextToSize(text, maxWidth);
    };

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 32, 44); // gray-900
    doc.text('SyncScript Report', margin, yPosition);
    yPosition += 10;

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128); // gray-500
    const dateStr = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.text(`Generated on ${dateStr}`, margin, yPosition);
    yPosition += 15;

    // Executive Summary Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text('Executive Summary', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81); // gray-700
    const summaryLines = splitText(processedNotes.executiveSummary || 'No summary available.', maxWidth);
    summaryLines.forEach((line: string) => {
      checkPageBreak(7);
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    yPosition += 10;

    // Action Items Section
    checkPageBreak(15);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Action Items', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    
    if (processedNotes.actionItems && processedNotes.actionItems.length > 0) {
      processedNotes.actionItems.forEach((item: string) => {
        checkPageBreak(7);
        const itemLines = splitText(`• ${item}`, maxWidth);
        itemLines.forEach((line: string, index: number) => {
          if (index > 0) checkPageBreak(7);
          doc.text(line, margin, yPosition);
          yPosition += 7;
        });
        yPosition += 3;
      });
    } else {
      doc.text('No action items available.', margin, yPosition);
      yPosition += 7;
    }
    yPosition += 10;

    // Technical Tasks Section
    checkPageBreak(15);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 99, 235);
    doc.text('Technical Tasks', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(55, 65, 81);
    
    if (processedNotes.technicalTasks && processedNotes.technicalTasks.length > 0) {
      processedNotes.technicalTasks.forEach((item: string) => {
        checkPageBreak(7);
        const itemLines = splitText(`• ${item}`, maxWidth);
        itemLines.forEach((line: string, index: number) => {
          if (index > 0) checkPageBreak(7);
          doc.text(line, margin, yPosition);
          yPosition += 7;
        });
        yPosition += 3;
      });
    } else {
      doc.text('No technical tasks available.', margin, yPosition);
      yPosition += 7;
    }

    // Save the PDF
    const fileName = `SyncScript_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-5xl sm:text-6xl font-light text-gray-900 mb-3 tracking-tight">
              SyncScripts
            </h1>
            <p className="text-gray-500 text-sm sm:text-base font-light mt-2">
              Transform raw notes into structured insights
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-2xl rounded-3xl border border-gray-200/80 shadow-xl"></div>
                <div className="relative p-6 sm:p-8">
                  <label className="block text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">
                    Raw Notes
                  </label>
                  <textarea
                    value={rawNotes}
                    onChange={(e) => setRawNotes(e.target.value)}
                    placeholder="Paste your meeting notes, brainstorming ideas, or discussion points here..."
                    className="w-full h-[500px] px-5 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/70 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none resize-none text-gray-800 placeholder-gray-400/70 text-[15px] leading-relaxed transition-all font-light"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !rawNotes.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:shadow-none disabled:translate-y-0 text-base"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Generate'
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50/80 border border-red-200/70 rounded-xl text-red-600 text-sm backdrop-blur-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Output Section */}
            <div className="space-y-5">
              {processedNotes && (
                <div className="mb-4 flex justify-end">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              )}
              
              <OutputCard
                title="Executive Summary"
                content={processedNotes?.executiveSummary}
                type="text"
              />

              <OutputCard
                title="Action Items"
                content={processedNotes?.actionItems}
                type="list"
              />

              <OutputCard
                title="Technical Tasks"
                content={processedNotes?.technicalTasks}
                type="list"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

interface OutputCardProps {
  title: string;
  content: string | string[] | undefined;
  type: 'text' | 'list';
}

function OutputCard({ title, content, type }: OutputCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-200/70 shadow-sm p-6 sm:p-8 min-h-[200px] flex flex-col transition-all duration-200 hover:shadow-md hover:border-gray-300/70">
      <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-5 sm:mb-6 tracking-tight">
        {title}
      </h3>

      {!content ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400/70 italic text-sm font-light">
            Results will appear here after processing...
          </p>
        </div>
      ) : type === 'text' ? (
        <div className="flex-1">
          <p className="text-gray-700 leading-relaxed text-[15px] sm:text-base font-light whitespace-pre-wrap">
            {content as string}
          </p>
        </div>
      ) : (
        <ul className="flex-1 space-y-2.5 sm:space-y-3">
          {(content as string[]).map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-blue-600 mt-1.5 text-xl font-light flex-shrink-0">•</span>
              <span className="text-gray-700 flex-1 text-[15px] sm:text-base leading-relaxed font-light">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white/50 backdrop-blur-sm mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8 sm:py-12">
        <p className="text-center text-sm text-gray-500 font-light">
          © {new Date().getFullYear()} SyncScripts by{' '}
          <a
            href="https://www.linkedin.com/in/rawat-priyanshu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Priyanshu Rawat
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
