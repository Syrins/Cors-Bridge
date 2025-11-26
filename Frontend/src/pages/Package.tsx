import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Package as PackageIcon, Download, Code, Zap, CheckCircle, ArrowRight, Terminal, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Package = () => {
  const { t } = useTranslation();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const installCommands = {
    npm: "npm install corsbridge",
    yarn: "yarn add corsbridge",
    pnpm: "pnpm add corsbridge"
  };

  const basicExample = `import { corsFetch } from 'corsbridge';

// Simple GET request
const data = await corsFetch('https://api.github.com/users/github');
console.log(data);`;

  const advancedExample = `import { corsFetch, ValidationError, RateLimitError } from 'corsbridge';

// Advanced usage with error handling
try {
  const response = await corsFetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: { name: 'John Doe' },
    params: { page: 1 },
    timeout: 10000
  });
  console.log(response);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.message);
    console.error('Request ID:', error.requestId);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded');
  }
}`;

  const reactExample = `import { useEffect, useState } from 'react';
import { corsFetch } from 'corsbridge';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    corsFetch('https://api.github.com/users/github')
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}`;

  const vueExample = `<script setup>
import { ref, onMounted } from 'vue';
import { corsFetch } from 'corsbridge';

const data = ref(null);

onMounted(async () => {
  data.value = await corsFetch('https://api.github.com/users/github');
});
</script>

<template>
  <div>{{ data }}</div>
</template>`;

  const features = [
    { icon: Zap, title: "Zero Config", desc: "No setup, no API keys, just install and use" },
    { icon: Code, title: "Type Safe", desc: "Full TypeScript support with auto-completion" },
    { icon: CheckCircle, title: "Secure", desc: "SSRF protection and validation on backend" },
    { icon: Download, title: "Lightweight", desc: "Only 7.3 KB gzipped, no dependencies" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto safe-px py-12 sm:py-16 lg:py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-sm">
            NPM Package Available
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            CorsBridge
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NPM Package
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Zero-Config CORS Proxy Client for JavaScript & TypeScript. Install once, use everywhere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="gap-2">
              <a href="https://www.npmjs.com/package/corsbridge" target="_blank" rel="noopener noreferrer">
                <PackageIcon className="h-5 w-5" />
                View on NPM
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <a href="https://github.com/syrins/cors-bridge" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                GitHub Repository
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 justify-center pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">7.3 KB</div>
              <div className="text-sm text-muted-foreground">Package Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">v1.0.0</div>
              <div className="text-sm text-muted-foreground">Latest Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">MIT</div>
              <div className="text-sm text-muted-foreground">License</div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto safe-px py-12 sm:py-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Quick Installation</h2>
            <p className="text-muted-foreground text-lg">Choose your preferred package manager</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="npm">npm</TabsTrigger>
                <TabsTrigger value="yarn">yarn</TabsTrigger>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
              </TabsList>

              {Object.entries(installCommands).map(([manager, command]) => (
                <TabsContent key={manager} value={manager} className="mt-6">
                  <Card className="p-6 relative">
                    <div className="flex items-center gap-3 mb-3">
                      <Terminal className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">Terminal</span>
                    </div>
                    <div className="relative">
                      <code className="block bg-secondary/50 p-4 rounded-lg font-mono text-sm sm:text-base">
                        {command}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-2"
                        onClick={() => copyCommand(command)}
                      >
                        {copiedCommand === command ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Code className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto safe-px py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why CorsBridge?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built for developers who need a reliable CORS solution without the hassle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:border-primary/50 transition-colors">
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Code Examples */}
      <section className="border-t border-border bg-secondary/30">
        <div className="container mx-auto safe-px py-12 sm:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Code Examples</h2>
            <p className="text-muted-foreground text-lg">See how easy it is to use CorsBridge</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="vue">Vue</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6">
                <CodeBlock code={basicExample} language="typescript" />
              </TabsContent>

              <TabsContent value="advanced" className="mt-6">
                <CodeBlock code={advancedExample} language="typescript" />
              </TabsContent>

              <TabsContent value="react" className="mt-6">
                <CodeBlock code={reactExample} language="tsx" />
              </TabsContent>

              <TabsContent value="vue" className="mt-6">
                <CodeBlock code={vueExample} language="vue" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="container mx-auto safe-px py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">API Reference</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">corsFetch(url, options?)</h3>
            <p className="text-muted-foreground mb-4">Main function to make proxied requests</p>
            <CodeBlock 
              code={`interface CorsFetchOptions {
  method?: string;                    // HTTP method
  headers?: Record<string, string>;   // Request headers
  body?: any;                         // Request body
  params?: Record<string, any>;       // Query parameters
  timeout?: number;                   // Request timeout (ms)
  responseType?: 'json' | 'text' | 'arrayBuffer' | 'blob';
}`}
              language="typescript"
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Convenience Methods</h3>
            <p className="text-muted-foreground mb-4">Shorthand methods for common HTTP verbs</p>
            <CodeBlock 
              code={`import { corsGet, corsPost, corsPut, corsPatch, corsDelete } from 'corsbridge';

// GET
await corsGet('https://api.example.com/users');

// POST
await corsPost('https://api.example.com/users', { name: 'John' });

// PUT
await corsPut('https://api.example.com/users/1', { name: 'Jane' });

// PATCH
await corsPatch('https://api.example.com/users/1', { email: 'jane@example.com' });

// DELETE
await corsDelete('https://api.example.com/users/1');`}
              language="typescript"
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-3">Error Handling</h3>
            <p className="text-muted-foreground mb-4">Typed error classes for better error handling</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">ValidationError</Badge>
                <span className="text-sm">400, 403, 414 - URL validation, SSRF blocks</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">RateLimitError</Badge>
                <span className="text-sm">429 - Rate limit exceeded</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">GatewayTimeoutError</Badge>
                <span className="text-sm">504 - Request timeout</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">BadGatewayError</Badge>
                <span className="text-sm">502 - Target server error</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto safe-px py-12 sm:py-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Install CorsBridge now and start building without CORS limitations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <a href="https://www.npmjs.com/package/corsbridge" target="_blank" rel="noopener noreferrer">
                <Download className="h-5 w-5" />
                Install from NPM
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/docs">Read Full Documentation</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Package;

