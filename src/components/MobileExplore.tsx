import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Map, BookOpen } from 'lucide-react';
import { MobileFishingSpots } from './MobileFishingSpots';
import { MobileFishGuide } from './MobileFishGuide';

export function MobileExplore() {
  const [activeTab, setActiveTab] = useState('spots');

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="spots" className="flex items-center space-x-2">
            <Map className="h-4 w-4" />
            <span>Места</span>
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Справочник</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="spots" className="mt-4">
          <MobileFishingSpots />
        </TabsContent>

        <TabsContent value="guide" className="mt-4">
          <MobileFishGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}
