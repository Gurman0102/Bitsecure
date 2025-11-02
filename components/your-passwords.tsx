"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Copy, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface YourPasswordsProps {
  website: string;
  username: string;
  password: string;
}

export function YourPasswords({ passwords }: { passwords: YourPasswordsProps[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [visible, setVisible] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  if (passwords.length === 0) {
    return (
      <Card className="border-dashed border-border bg-card/50 p-8 text-center">
        <p className="text-muted-foreground">No passwords saved yet. Add one to get started!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3 h-48 overflow-y-auto pr-2">
      {passwords.map((entry) => (
        <Card key={`${entry.website}-${entry.username}`} className="border-primary/10 bg-gradient-to-r from-card to-card/80 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <Link href={entry .website.startsWith("http") ? entry.website : `https://${entry.website}`} target="_blank" className="text-sm font-medium text-foreground hover:underline">
                  <p className="font-medium text-foreground">{entry.website}</p>
                  </Link>
                  <p className="text-xs text-muted-foreground">{entry.username}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setVisible(visible === entry.password ? null : entry.password)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleCopy(entry.password)}
                >
                  <Copy className={`h-4 w-4 ${copied === entry.password ? "text-green-500" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {visible === entry.password ? entry.password : "•".repeat(entry.password.length)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
