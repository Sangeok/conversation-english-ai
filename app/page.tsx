import { ModeToggle } from "@/components/modeToggle";
import StartedButton from "@/components/ui/startedButton";

export default function Home() {
    return (
      <div className="flex flex-col justify-between h-screen pt-16">
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="flex w-3/4 justify-around">
            
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
              <StartedButton />
            </div>
          </div>
        </div>

        <div/>

      </div>
    );
}
