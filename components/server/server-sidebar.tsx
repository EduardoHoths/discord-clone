import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ChannelType, MemberRole } from "@/types/enums";

import { redirect } from "next/navigation";

import ServerSearch from "./server-search";
import ServerHeader from "./server-header";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import ServerSection from "./server-section";
import ServerChannel from "./server-channel";
import ServerMember from "./server-member";

interface ServerSidebarProps {
  serverId: string;
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
};

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: { orderBy: { createdAt: "asc" } },
      members: {
        include: { profile: true },
        orderBy: { role: "asc" },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const filterChannels = (type: ChannelType) =>
    server.channels.filter((channel) => channel.type === type);

  const textChannels = filterChannels(ChannelType.TEXT);
  const audioChannels = filterChannels(ChannelType.AUDIO);
  const videoChannels = filterChannels(ChannelType.VIDEO);

  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find((member) => member.profileId === profile.id)
    ?.role as MemberRole;

  const mapChannelsToData = (channels: typeof server.channels) =>
    channels.map((channel) => ({
      id: channel.id,
      name: channel.name,
      icon: iconMap[channel.type as ChannelType],
    }));

  const searchData = [
    {
      label: "Text Channels",
      type: "channel" as const,
      data: mapChannelsToData(textChannels),
    },
    {
      label: "Voice Channels",
      type: "channel" as const,
      data: mapChannelsToData(audioChannels),
    },
    {
      label: "Video Channels",
      type: "channel" as const,
      data: mapChannelsToData(videoChannels),
    },
    {
      label: "Members",
      type: "member" as const,
      data: members.map((member) => ({
        id: member.id,
        name: member.profile.name,
        icon: roleIconMap[member.role as MemberRole],
      })),
    },
  ];

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch data={searchData} />
        </div>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />

        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              label="Text Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              label="Voice Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {audioChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              label="Video Channels"
              role={role}
            />
            <div className="space-y-[2px]">
              {videoChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              label="Members"
              role={role}
              server={server}
            />
            {members.map((member) => (
              <ServerMember key={member.id} member={member} server={server} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
export default ServerSidebar;
