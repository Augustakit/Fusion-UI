export const getGamemodeName = (gamemode: string) => {
    switch (gamemode) {
        case 'ConquestLarge0':
            return '大型征服';
        case 'ConquestSmall0':
            return '征服';
        case 'ConquestAssaultLarge0':
            return '征服突袭(大)';
        case 'ConquestAssaultSmall0':
            return '征服突袭';
        case 'ConquestAssaultSmall1':
            return '征服突袭：第二天';
        case 'RushLarge0':
            return '突袭';
        case 'SquadRush0':
            return '小队突袭';
        case 'SquadDeathMatch0':
            return '小队死斗';
        case 'TeamDeathMatch0':
            return '团队死斗';
        case 'TeamDeathMatchC0':
            return '团队死斗正面交锋';
        case 'CaptureTheFlag0':
            return '夺旗';
        case 'AirSuperiority0':
            return '空域优势';
        case 'GunMaster0':
            return '枪神';
        case 'Scavenger0':
            return '荒荡征服';
        case 'TankSuperiority0':
            return '装甲优势';
        case 'Domination0':
            return '抢攻';

        default:
            return gamemode
                .replace(/([a-z])([A-Z])/g, '$1 $2') // Add a space before capital letters following a lowercase letter
                .replace(/0$/, '') // Remove trailing 0
                .replace(/([1-9]\d*)$/, ' #$1'); // Parse 1 and greater numbers to "#n" format;
    }
};

export const getMapName = (map: string) => {
    switch (map) {
        case 'Levels/MP_001/MP_001':
            return '大型市集';
        case 'Levels/MP_003/MP_003':
            return '德黑兰公路';
        case 'Levels/MP_007/MP_007':
            return '里海边境';
        case 'Levels/MP_011/MP_011':
            return '塞纳河';
        case 'Levels/MP_012/MP_012':
            return '火线风暴行动';
        case 'Levels/MP_013/MP_013':
            return '德马峰顶';
        case 'Levels/MP_017/MP_017':
            return '诺沙运河';
        case 'Levels/MP_018/MP_018':
            return '哈格岛';
        case 'Levels/MP_Subway/MP_Subway':
            return '地铁行动';
        case 'Levels/XP1_001/XP1_001':
            return '强袭卡肯';
        case 'Levels/XP1_002/XP1_002':
            return '阿曼湾';
        case 'Levels/XP1_003/XP1_003':
            return '半岛电视台';
        case 'Levels/XP1_004/XP1_004':
            return '威克岛';
        case 'Levels/XP2_Factory/XP2_Factory':
            return '废置工厂';
        case 'Levels/XP2_Office/XP2_Office':
            return '白领行动';
        case 'Levels/XP2_Palace/XP2_Palace':
            return '当亚堡垒';
        case 'Levels/XP2_Skybar/XP2_Skybar':
            return '史巴塔';
        case 'Levels/XP3_Desert/XP3_Desert':
            return '班达沙漠';
        case 'Levels/XP3_Alborz/XP3_Alborz':
            return '厄尔布尔士山脉';
        case 'Levels/XP3_Shield/XP3_Shield':
            return '装甲护罩';
        case 'Levels/XP3_Valley/XP3_Valley':
            return '死亡谷';
        case 'Levels/XP4_FD/XP4_FD':
            return '玛卡斯巨石';
        case 'Levels/XP4_Parl/XP4_Parl':
            return '阿扎迪王宫';
        case 'Levels/XP4_Quake/XP4_Quake':
            return '震央';
        case 'Levels/XP4_Rubble/XP4_Rubble':
            return '塔拉市场';
        case 'Levels/XP5_001/XP5_001':
            return '河岸行动';
        case 'Levels/XP5_002/XP5_002':
            return '内班丹浅滩';
        case 'Levels/XP5_003/XP5_003':
            return '基沙铁路';
        case 'Levels/XP5_004/XP5_004':
            return '沙巴兰管线';
        case 'Levels/COOP_002/COOP_002':
            return '游击战';
        case 'Levels/COOP_003/COOP_003':
            return '拯救人质';
        case 'Levels/COOP_006/COOP_006':
            return '火雨行动';
        case 'Levels/COOP_007/COOP_007':
            return '撤离行动';
        case 'Levels/COOP_009/COOP_009':
            return '突破重围';
        case 'Levels/COOP_010/COOP_010':
            return '分秒必争';
        case 'Levels/SP_Bank/SP_Bank':
            return '断头台行动';
        case 'Levels/SP_Earthquake/SP_Earthquake':
            return '碎剑者行动';
        case 'Levels/SP_Earthquake2/SP_Earthquake2':
            return '暴动';
        case 'Levels/SP_Finale/SP_Finale':
            return '大毁灭者';
        case 'Levels/SP_Interrogation/SP_Interrogation':
            return '序章';
        case 'Levels/SP_Jet/SP_Jet':
            return '追猎行动';
        case 'Levels/SP_New_York/SP_New_York':
            return '永远忠诚';
        case 'Levels/SP_Paris/SP_Paris':
            return '战友';
        case 'Levels/SP_Sniper/SP_Sniper':
            return '夜袭';
        case 'Levels/SP_Tank/SP_Tank':
            return '迅雷行动';
        case 'Levels/SP_Tank_b/SP_Tank_b':
            return '嫉恶如仇';
        case 'Levels/SP_Valley/SP_Valley':
            return '进退两难';
        case 'Levels/SP_Villa/SP_Villa':
            return '卡法洛夫';

        default:
            const tokens = map.split('/');
            return tokens[tokens.length - 1];
    }
};

export const getLevelName = (map: string) => {
    const tokens = map.split('/');
    return tokens[tokens.length - 1];
};

export const hasMapImage = (map: string) => {
    switch (map) {
        case 'Levels/MP_001/MP_001':
        case 'Levels/MP_003/MP_003':
        case 'Levels/MP_007/MP_007':
        case 'Levels/MP_011/MP_011':
        case 'Levels/MP_012/MP_012':
        case 'Levels/MP_013/MP_013':
        case 'Levels/MP_017/MP_017':
        case 'Levels/MP_018/MP_018':
        case 'Levels/MP_Subway/MP_Subway':
        case 'Levels/XP1_001/XP1_001':
        case 'Levels/XP1_002/XP1_002':
        case 'Levels/XP1_003/XP1_003':
        case 'Levels/XP1_004/XP1_004':
        case 'Levels/XP2_Factory/XP2_Factory':
        case 'Levels/XP2_Office/XP2_Office':
        case 'Levels/XP2_Palace/XP2_Palace':
        case 'Levels/XP2_Skybar/XP2_Skybar':
        case 'Levels/XP3_Desert/XP3_Desert':
        case 'Levels/XP3_Alborz/XP3_Alborz':
        case 'Levels/XP3_Shield/XP3_Shield':
        case 'Levels/XP3_Valley/XP3_Valley':
        case 'Levels/XP4_FD/XP4_FD':
        case 'Levels/XP4_Parl/XP4_Parl':
        case 'Levels/XP4_Quake/XP4_Quake':
        case 'Levels/XP4_Rubble/XP4_Rubble':
        case 'Levels/XP5_001/XP5_001':
        case 'Levels/XP5_002/XP5_002':
        case 'Levels/XP5_003/XP5_003':
        case 'Levels/XP5_004/XP5_004':
        case 'Levels/COOP_002/COOP_002':
        case 'Levels/COOP_003/COOP_003':
        case 'Levels/COOP_006/COOP_006':
        case 'Levels/COOP_007/COOP_007':
        case 'Levels/COOP_009/COOP_009':
        case 'Levels/COOP_010/COOP_010':
        case 'Levels/SP_Bank/SP_Bank':
        case 'Levels/SP_Earthquake/SP_Earthquake':
        case 'Levels/SP_Earthquake2/SP_Earthquake2':
        case 'Levels/SP_Finale/SP_Finale':
        case 'Levels/SP_Interrogation/SP_Interrogation':
        case 'Levels/SP_Jet/SP_Jet':
        case 'Levels/SP_New_York/SP_New_York':
        case 'Levels/SP_Paris/SP_Paris':
        case 'Levels/SP_Sniper/SP_Sniper':
        case 'Levels/SP_Tank/SP_Tank':
        case 'Levels/SP_Tank_b/SP_Tank_b':
        case 'Levels/SP_Valley/SP_Valley':
        case 'Levels/SP_Villa/SP_Villa':
            return true;
        default:
            return false;
    }
};

export const getGamemodes = () => {
    return [
        'ConquestLarge0',
        'ConquestSmall0',
        'ConquestAssaultLarge0',
        'ConquestAssaultSmall0',
        'ConquestAssaultSmall1',
        'RushLarge0',
        'SquadRush0',
        'SquadDeathMatch0',
        'TeamDeathMatch0',
        'TeamDeathMatchC0',
        'CaptureTheFlag0',
        'AirSuperiority0',
        'GunMaster0',
        'Scavenger0',
        'TankSuperiority0',
        'Domination0',
        'KingOfTheHill0',
    ];
};

export const getMaps = () => {
    return [
        'Levels/MP_001/MP_001',
        'Levels/MP_003/MP_003',
        'Levels/MP_007/MP_007',
        'Levels/MP_011/MP_011',
        'Levels/MP_012/MP_012',
        'Levels/MP_013/MP_013',
        'Levels/MP_017/MP_017',
        'Levels/MP_018/MP_018',
        'Levels/MP_Subway/MP_Subway',
        'Levels/XP1_001/XP1_001',
        'Levels/XP1_002/XP1_002',
        'Levels/XP1_003/XP1_003',
        'Levels/XP1_004/XP1_004',
        'Levels/XP2_Factory/XP2_Factory',
        'Levels/XP2_Office/XP2_Office',
        'Levels/XP2_Palace/XP2_Palace',
        'Levels/XP2_Skybar/XP2_Skybar',
        'Levels/XP3_Desert/XP3_Desert',
        'Levels/XP3_Alborz/XP3_Alborz',
        'Levels/XP3_Shield/XP3_Shield',
        'Levels/XP3_Valley/XP3_Valley',
        'Levels/XP4_FD/XP4_FD',
        'Levels/XP4_Parl/XP4_Parl',
        'Levels/XP4_Quake/XP4_Quake',
        'Levels/XP4_Rubble/XP4_Rubble',
        'Levels/XP5_001/XP5_001',
        'Levels/XP5_002/XP5_002',
        'Levels/XP5_003/XP5_003',
        'Levels/XP5_004/XP5_004',
        'Levels/COOP_002/COOP_002',
        'Levels/COOP_003/COOP_003',
        'Levels/COOP_006/COOP_006',
        'Levels/COOP_007/COOP_007',
        'Levels/COOP_009/COOP_009',
        'Levels/COOP_010/COOP_010',
        'Levels/SP_Bank/SP_Bank',
        'Levels/SP_Earthquake/SP_Earthquake',
        'Levels/SP_Earthquake2/SP_Earthquake2',
        'Levels/SP_Finale/SP_Finale',
        'Levels/SP_Interrogation/SP_Interrogation',
        'Levels/SP_Jet/SP_Jet',
        'Levels/SP_New_York/SP_New_York',
        'Levels/SP_Paris/SP_Paris',
        'Levels/SP_Sniper/SP_Sniper',
        'Levels/SP_Tank/SP_Tank',
        'Levels/SP_Tank_b/SP_Tank_b',
        'Levels/SP_Valley/SP_Valley',
        'Levels/SP_Villa/SP_Villa',
    ];
};

export const isVextCompatible = (server: any, vextVersion: string) => {
    const currentVextParts = vextVersion.split('.');
    const serverVextParts = server.variables.vext_req.split('.');

    let currentMajor = currentVextParts.length > 0 ? parseInt(currentVextParts[0], 10) : 1;
    let currentMinor = currentVextParts.length > 1 ? parseInt(currentVextParts[1], 10) : 0;
    let currentPatch = currentVextParts.length > 2 ? parseInt(currentVextParts[2], 10) : 0;

    let serverMajor = serverVextParts.length > 0 ? parseInt(serverVextParts[0], 10) : 1;
    let serverMinor = serverVextParts.length > 1 ? parseInt(serverVextParts[1], 10) : 0;
    let serverPatch = serverVextParts.length > 2 ? parseInt(serverVextParts[2], 10) : 0;

    if (isNaN(currentMajor)) currentMajor = 1;

    if (isNaN(currentMinor)) currentMinor = 0;

    if (isNaN(currentPatch)) currentPatch = 0;

    if (isNaN(serverMajor)) serverMajor = 1;

    if (isNaN(serverMinor)) serverMinor = 0;

    if (isNaN(serverPatch)) serverPatch = 0;

    if (currentMajor !== serverMajor) return false;

    if (currentMinor < serverMinor) return false;

    if (currentMinor === serverMinor && currentPatch < serverPatch) return false;

    return true;
};

export const isServerBuildNewer = (server: any, build: any) => {
    const currentBuild = parseInt(build, 10);
    const requiredServerBuild = parseInt(server.variables.min_buildno, 10);

    return currentBuild < requiredServerBuild;
};

export const isServerBuildOlder = (server: any, minServerBuild: any) => {
    const minimumServerBuild = parseInt(minServerBuild, 10);
    const currentServerBuild = parseInt(server.variables.buildno, 10);

    return currentServerBuild < minimumServerBuild;
};

export const areXPacksAvailable = (server: any, availableXPacks: any) => {
    // Try to extract the XPack from the map.
    const xpacks = server.variables.xpacks;

    let xpackList = [];

    if (xpacks && xpacks.length > 0) xpackList = xpacks.split(',').map((val: any) => parseInt(val, 10));

    for (const xpack of xpackList) {
        if (isNaN(xpack)) continue;

        if (availableXPacks.indexOf(xpack) === -1) return false;
    }

    return true;
};

export const isMapAvailable = (server: any, availableXPacks: any) => {
    // Try to extract the XPack from the map.
    const mapname = server.variables.mapname;

    if (!mapname.startsWith('Levels/XP')) return true;

    const xpack = parseInt(mapname.substr(9, 1));

    if (isNaN(xpack)) return true;

    return availableXPacks.indexOf(xpack) !== -1;
};

/**
 * This method checks for join compatibility with this server and
 * returns an appropriate error message or `null` if compatible.
 * @returns {string|null}
 */
export const checkServerCompatibility = (
    server: any,
    availableXPacks: any,
    minServerBuild: any,
    build: any,
    vextVersion: any
) => {
    if (!isMapAvailable(server, availableXPacks))
        return '此服务器正在运行您当前未安装的地图';

    if (!areXPacksAvailable(server, availableXPacks))
        return '此服务器正在使用您当前未安装的DLC内容';

    if (isServerBuildOlder(server, minServerBuild)) return '此服务器正在运行过时的VU版本';

    if (isServerBuildNewer(server, build))
        return '此服务器正在运行较新版本的VU，您需要更新客户端才能加入';

    if (!isVextCompatible(server, vextVersion))
        return '此服务器正在运行与您当前版本的VU不兼容的模组，您可能需要更新';

    return null;
};