import * as semver from 'semver'

export function isSemVer(version: string): boolean {
    return semver.valid(version) !== null;
}

export function is Prerelease(version: string): boolean {
    return semver.prerelease(version !== null);
}

export function removePrefix(version: string): string {
    const parseVersion = semver.valid(version);
    return parseVersion ? parseVersion : version;
}