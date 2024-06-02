import { ModeToggle } from "@/components/modeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
      <div className="flex flex-col justify-between h-screen">

        <div className="flex justify-end mt-4 mr-4">
          <ModeToggle />
        </div>

        <div>
          <div className="flex justify-around">
            
            <div className="max-w-96">
              <h1 className="text-2xl">English Conversation Practice</h1>
              <br/>
              <p>
                  Welcome to English Conversation Practice!<br/>
                  This is a website designed to help you practice your English conversation skills.<br/>
                  We hope you find this website helpful in improving your English conversation skills. <br/>
                  If you have any questions or feedback, please feel free to contact us. Happy practicing! <br/>
              </p>
            </div>
            <div className="flex">
              <Button variant="secondary" className="self-center">
                <ArrowRight className="mr-2"/> Get Started
              </Button>
            </div>
          </div>
        </div>

        <div/>

      </div>
    );
}
