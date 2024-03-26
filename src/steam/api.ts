export async function getOwnedGames(steamid: string): Promise<GetOwnedGamesResponseWrapper> {
    const r = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&include_appinfo=true&include_played_free_games=true`);

    if (r.ok)
        return await r.json();

    return ({
        response: { game_count: 0, games: [] }
    });
}

export interface GetOwnedGamesResponseWrapper {
    response: GetOwnedGamesResponse;
}

export interface GetOwnedGamesResponse {
    game_count: number;
    games: SteamGame[];
}

export interface SteamGame {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    rtime_last_played: number;
    playtime_disconnected: number;
}