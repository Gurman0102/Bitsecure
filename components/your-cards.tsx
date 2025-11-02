"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Eye } from "lucide-react"

interface YourCardsProps {

    cardNo: string;
    expDate: string;
    cvv: string;
    cardHolder: string;
  
}


export function YourCards({cards}:{cards:YourCardsProps[]}) {
  if (cards.length === 0) {
    return (
      <Card className="border-dashed border-border bg-card/50 p-8 text-center">
        <p className="text-muted-foreground">No cards saved yet. Add one to get started!</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3 h-48 overflow-y-auto pr-2">
      {cards.map((card) => (
        <Card key={card.cardNo} className="border-primary/10 bg-gradient-to-r from-card to-card/80 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{card.cardHolder}</p>
                
              </div>
              <p className="font-mono text-sm text-muted-foreground">{card.cardNo}</p>
              <p className="text-xs text-muted-foreground">Expires: {card.expDate}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
