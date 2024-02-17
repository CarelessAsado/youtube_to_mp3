import ytdl from "ytdl-core";
import { NextResponse } from "next/server";
import { HEADER_VID_TITLE_KEY } from "@/constants";
import { parseErrorResponse } from "@/helpers/parseErrorResponse";

export async function POST(Request: Request) {
  const res = await Request.json();
  const urlToYoutube = res.url;

  if (!ytdl.validateURL(urlToYoutube)) {
    return NextResponse.json(
      parseErrorResponse("Invalid YouTube URL, check the url is correct"),
      {
        status: 500,
      }
    );
  }

  try {
    const videoInfo = await ytdl.getInfo(urlToYoutube);

    const audioFormat = ytdl.filterFormats(videoInfo.formats, "audioonly")[0];
    const audioReadableStream = ytdl.downloadFromInfo(videoInfo, {
      filter: "audioonly",
      quality: "highestaudio",
    });

    const vidTitle = videoInfo.videoDetails.title;
    //@ts-ignore
    return new NextResponse(audioReadableStream, {
      headers: { [HEADER_VID_TITLE_KEY]: vidTitle },
    });
  } catch (err: any) {
    return NextResponse.json(
      parseErrorResponse(
        "Error converting video, more info: " + JSON.stringify(err?.message)
      ),
      { status: 500 }
    );
  }
}
