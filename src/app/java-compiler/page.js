import { Metadata } from 'next'

export const metadata = {
  title: "CodeMurf - #1 AI Code Assistant VS Code Extension | Free Alternative to Cursor AI",
  description: "Revolutionary VS Code extension with AI code completion, 500+ prebuilt templates, and Model Context Protocol (MCP) integration. Free open source alternative to Cursor AI, Windsurf, and Kilo-Code. Download now for 10x faster coding with AI assistance.",
  keywords: "AI code assistant, VS Code AI extension, AI coding tools, cursor ai alternative, windsurf competitor, kilo-code alternative, free AI extension for VS Code, best vs code ai extension, AI code completion, MCP integration, model context protocol, VS Code extension, open source AI code agent, prebuilt code templates VS Code, developer productivity tools, AI assistant for developers, free coding AI tools, VS Code marketplace extension",
  openGraph: {
    title: "CodeMurf - AI VS Code Extension | Smart Coding Assistant",
    description: "Powerful VS Code extension with AI assistance, prebuilt templates, and MCP integration. Open source alternative to Cursor AI and Windsurf.",
    url: 'https://codemurf.com/vs-code-extension',
    type: 'website',
    siteName: 'CodeMurf',
  },
  alternates: {
    canonical: '/vs-code-extension',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function VSCodeExtension() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6">
            CodeMurf - The #1 AI Code Assistant VS Code Extension
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the future of coding with CodeMurf VS Code extension. Get intelligent AI code completion, 
            500+ prebuilt templates, Model Context Protocol (MCP) integration, and smart AI assistance. 
            The completely free, open source alternative to Cursor AI, Windsurf, and Kilo-Code that developers love.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold">
              Install Free VS Code Extension
            </button>
            <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold">
              View on VS Code Marketplace
            </button>
          </div>
          <div className="text-sm text-gray-400">
            ⭐ 4.9/5 Stars | 10K+ Downloads | 100% Free Forever
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why CodeMurf is the Best AI Code Assistant for VS Code
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🤖 Advanced AI Code Completion</h3>
              <p className="text-gray-300">
                State-of-the-art AI code assistant with context-aware suggestions for 50+ programming languages. 
                Smarter than GitHub Copilot with real-time AI coding assistance that understands your project context.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">📦 500+ Prebuilt Code Templates</h3>
              <p className="text-gray-300">
                Massive library of ready-to-use code templates, React components, and boilerplates. 
                One-click integration with popular frameworks like Next.js, Vue, Angular, and more.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🔗 Model Context Protocol (MCP) Integration</h3>
              <p className="text-gray-300">
                First VS Code extension with native MCP support for seamless AI model integration. 
                Connect with OpenAI, Anthropic, and custom AI providers for personalized coding experience.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">⚡ Lightning-Fast Performance</h3>
              <p className="text-gray-300">
                Optimized for speed with intelligent caching and minimal resource usage. 
                Get AI suggestions in milliseconds without slowing down your VS Code editor.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🔓 100% Free & Open Source</h3>
              <p className="text-gray-300">
                No subscription fees, no usage limits, no hidden costs. Complete source code transparency 
                with active community contributions and regular updates.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🛡️ Privacy-First AI Coding</h3>
              <p className="text-gray-300">
                Your code stays private. Local processing options, secure AI connections, 
                and full control over what data is shared with AI models.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            CodeMurf vs Other AI VS Code Extensions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-700 rounded-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-center">CodeMurf</th>
                  <th className="p-4 text-center">Cursor AI</th>
                  <th className="p-4 text-center">Windsurf</th>
                  <th className="p-4 text-center">Kilo-Code</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Open Source</td>
                  <td className="p-4 text-center text-green-500">✓</td>
                  <td className="p-4 text-center text-red-500">✗</td>
                  <td className="p-4 text-center text-red-500">✗</td>
                  <td className="p-4 text-center text-yellow-500">Partial</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">MCP Support</td>
                  <td className="p-4 text-center text-green-500">✓</td>
                  <td className="p-4 text-center text-red-500">✗</td>
                  <td className="p-4 text-center text-red-500">✗</td>
                  <td className="p-4 text-center text-red-500">✗</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Prebuilt Templates</td>
                  <td className="p-4 text-center text-green-500">✓</td>
                  <td className="p-4 text-center text-yellow-500">Limited</td>
                  <td className="p-4 text-center text-yellow-500">Limited</td>
                  <td className="p-4 text-center text-yellow-500">Basic</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td className="p-4">Free Tier</td>
                  <td className="p-4 text-center text-green-500">Full Featured</td>
                  <td className="p-4 text-center text-yellow-500">Limited</td>
                  <td className="p-4 text-center text-yellow-500">Limited</td>
                  <td className="p-4 text-center text-green-500">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Getting Started */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Get Started with CodeMurf VS Code Extension
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Installation Guide</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Open VS Code Extensions marketplace (Ctrl+Shift+X)</li>
                <li>Search for &quot;CodeMurf&quot;</li>
                <li>Click &quot;Install&quot; on the CodeMurf extension</li>
                <li>Restart VS Code if prompted</li>
                <li>Configure your AI preferences in settings</li>
                <li>Start coding with AI assistance!</li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Features Demo</h3>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">{`// AI Code Completion Example`}</div>
                <pre className="text-green-400">
{`function fetchUserData(userId) {
  // CodeMurf AI suggests:
  return fetch(\`/api/users/\${userId}\`)
    .then(response => response.json())
    .then(data => {
      // Smart error handling suggested
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.user;
    });
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Benefits Section */}
        <section className="py-16 bg-gray-800 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              CodeMurf: The Ultimate AI Code Assistant for Modern Developers
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">🎯 Perfect For:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• JavaScript developers seeking AI code completion</li>
                  <li>• React developers needing prebuilt components</li>
                  <li>• Teams looking for Cursor AI alternatives</li>
                  <li>• Developers wanting MCP integration</li>
                  <li>• Open source enthusiasts</li>
                  <li>• Budget-conscious developers (100% free)</li>
                  <li>• Privacy-focused coding teams</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">🏆 Key Advantages:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• No subscription fees (unlike Cursor AI)</li>
                  <li>• Faster than GitHub Copilot</li>
                  <li>• More templates than Windsurf</li>
                  <li>• Open source transparency</li>
                  <li>• MCP protocol support</li>
                  <li>• Multi-language AI assistance</li>
                  <li>• Active developer community</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Download CTA Section */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Coding Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who&apos;ve switched to CodeMurf for faster, smarter coding. 
            Install the best free AI code assistant for VS Code today!
          </p>
          <div className="flex gap-4 justify-center mb-4">
            <button className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold text-lg">
              🚀 Install CodeMurf VS Code Extension
            </button>
            <button className="border-2 border-blue-600 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold text-lg">
              📖 View Documentation
            </button>
          </div>
          <div className="text-sm text-gray-400">
            ✅ Free Forever | ⚡ Instant Setup | 🔒 Privacy Protected | 📈 10K+ Happy Developers
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions about CodeMurf AI Code Assistant
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Is CodeMurf the best free AI extension for VS Code?</h3>
              <p className="text-gray-300">
                Yes! CodeMurf is completely free and open source with no usage limits. Unlike Cursor AI or Windsurf 
                that require subscriptions, CodeMurf offers full-featured AI code assistance, MCP integration, 
                and 500+ templates completely free forever.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How does CodeMurf compare to Cursor AI, Windsurf, and Kilo-Code?</h3>
              <p className="text-gray-300">
                CodeMurf offers superior AI capabilities with unique features: MCP integration (not available in competitors), 
                more prebuilt templates, faster performance, complete open source transparency, and 100% free access. 
                No vendor lock-in or subscription fees like Cursor AI and Windsurf.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">What programming languages does CodeMurf AI code assistant support?</h3>
              <p className="text-gray-300">
                CodeMurf supports 50+ programming languages including JavaScript, TypeScript, Python, Java, C++, 
                Rust, Go, PHP, Ruby, Swift, Kotlin, and more. AI assistance works across all supported languages 
                with intelligent context-aware suggestions.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Can I use CodeMurf VS Code extension offline?</h3>
              <p className="text-gray-300">
                Basic features like templates and code snippets work offline. AI assistance requires internet connection 
                for cloud models, but we&apos;re developing local AI model support for complete offline functionality 
                while maintaining privacy.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How do I configure Model Context Protocol (MCP) integration?</h3>
              <p className="text-gray-300">
                Go to VS Code settings, search for &quot;CodeMurf MCP&quot;, and add your preferred AI model endpoints. 
                CodeMurf supports OpenAI GPT-4, Claude, Google Gemini, and custom model providers through MCP protocol.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Is CodeMurf better than GitHub Copilot for AI coding?</h3>
              <p className="text-gray-300">
                CodeMurf offers unique advantages: MCP integration for multiple AI models, extensive template library, 
                faster performance, and complete transparency. While GitHub Copilot is excellent, CodeMurf provides 
                more flexibility and features for modern AI-assisted development.
              </p>
            </div>
            <div className="p-6 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How to install CodeMurf AI extension in VS Code?</h3>
              <p className="text-gray-300">
                Open VS Code → Extensions (Ctrl+Shift+X) → Search &quot;CodeMurf&quot; → Click Install → Restart VS Code → 
                Configure AI settings → Start coding with AI assistance! Available in VS Code Marketplace.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
